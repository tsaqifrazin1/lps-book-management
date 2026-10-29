using LpsBookManagement.Api.DTOs;

namespace LpsBookManagement.Api.Services;

public interface IMasterJenisBukuService
{
    Task<List<MasterJenisBukuDto>> GetAllAsync(CancellationToken ct);
    Task<MasterJenisBukuDto?> GetAsync(int id, CancellationToken ct);
    Task<MasterJenisBukuDto> CreateAsync(CreateMasterJenisBukuRequest request, CancellationToken ct);
    Task<bool> UpdateAsync(int id, UpdateMasterJenisBukuRequest request, CancellationToken ct);
    Task<bool> DeleteAsync(int id, CancellationToken ct);
}