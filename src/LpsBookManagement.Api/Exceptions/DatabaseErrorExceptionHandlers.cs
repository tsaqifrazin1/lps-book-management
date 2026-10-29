using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace LpsBookManagement.Api.Exceptions;

public sealed class DatabaseErrorExceptionHandler(
    ILogger<DatabaseErrorExceptionHandler> logger)
    : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not DbUpdateException) return false;

        logger.LogError(
            exception,
            "A database operation failed. TraceId: {TraceId}",
            httpContext.TraceIdentifier);

        var (statusCode, title, detail) = GetErrorDetails(exception);

        httpContext.Response.StatusCode = statusCode;

        var problem = new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = detail,
            Instance = httpContext.Request.Path
        };

        problem.Extensions["traceId"] = httpContext.TraceIdentifier;

        await httpContext.Response.WriteAsJsonAsync(
            problem,
            cancellationToken);

        return true;
    }

    private static (int StatusCode, string Title, string Detail)
        GetErrorDetails(Exception exception)
    {
        var postgresException =
            exception.GetBaseException() as PostgresException;

        return postgresException?.SqlState switch
        {
            PostgresErrorCodes.UniqueViolation => (
                StatusCodes.Status409Conflict,
                "Conflict",
                "A record with the same unique value already exists."),

            PostgresErrorCodes.ForeignKeyViolation => (
                StatusCodes.Status409Conflict,
                "Conflict",
                "The operation cannot be completed because the record is referenced by other records."),

            PostgresErrorCodes.CheckViolation => (
                StatusCodes.Status400BadRequest,
                "Invalid Data",
                "The submitted data violates a database constraint."),

            PostgresErrorCodes.NotNullViolation => (
                StatusCodes.Status400BadRequest,
                "Invalid Data",
                "A required database value is missing."),

            PostgresErrorCodes.StringDataRightTruncation => (
                StatusCodes.Status400BadRequest,
                "Invalid Data",
                "One or more submitted values exceed the allowed length."),

            _ => (
                StatusCodes.Status500InternalServerError,
                "Database Error",
                "A database operation could not be completed.")
        };
    }
}