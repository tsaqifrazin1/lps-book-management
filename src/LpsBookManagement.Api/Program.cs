using Lps.Api.Services;
using LpsBookManagement.Api.Data;
using LpsBookManagement.Api.Exceptions;
using LpsBookManagement.Api.Repositories;
using LpsBookManagement.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IMasterJenisBukuRepository, MasterJenisBukuRepository>();
builder.Services.AddScoped<IBukuRepository, BukuRepository>();
builder.Services.AddScoped<IMasterJenisBukuService, MasterJenisBukuService>();
builder.Services.AddScoped<IBukuService, BukuService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("React", policy =>
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddProblemDetails();

builder.Services.AddExceptionHandler<DatabaseErrorExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("React");
app.UseExceptionHandler();
app.MapControllers();

app.Run();

public partial class Program { }