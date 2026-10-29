using LpsBookManagement.Api.DTOs;

namespace LpsBookManagement.Api.Services;

public interface IBukuService
{
    Task<List<BukuDto>> SearchAsync(string? search, CancellationToken ct);
    Task<BukuDto?> GetAsync(int id, CancellationToken ct);
    Task<BukuDto> CreateAsync(CreateBukuRequest request, CancellationToken ct);
    Task<bool> UpdateAsync(int id, UpdateBukuRequest request, CancellationToken ct);
    Task<bool> DeleteAsync(int id, CancellationToken ct);
    Task<string> ExportCsvAsync(string? search, CancellationToken ct);
}