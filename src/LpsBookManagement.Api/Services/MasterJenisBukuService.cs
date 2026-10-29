using LpsBookManagement.Api.DTOs;
using LpsBookManagement.Api.Models;
using LpsBookManagement.Api.Repositories;
using LpsBookManagement.Api.Services;

namespace Lps.Api.Services;

public class MasterJenisBukuService(IMasterJenisBukuRepository repository) : IMasterJenisBukuService
{
    public async Task<List<MasterJenisBukuDto>> GetAllAsync(CancellationToken ct)
    {
        return (await repository.GetAllAsync(ct)).Select(x => new MasterJenisBukuDto(x.Id, x.Nama)).ToList();
    }

    public async Task<MasterJenisBukuDto?> GetAsync(int id, CancellationToken ct)
    {
        var x = await repository.GetByIdAsync(id, ct);
        return x is null ? null : new MasterJenisBukuDto(x.Id, x.Nama);
    }

    public async Task<MasterJenisBukuDto> CreateAsync(CreateMasterJenisBukuRequest request, CancellationToken ct)
    {
        var entity = new MasterJenisBuku { Nama = request.Nama.Trim() };
        await repository.AddAsync(entity, ct);
        await repository.SaveChangesAsync(ct);
        return new MasterJenisBukuDto(entity.Id, entity.Nama);
    }

    public async Task<bool> UpdateAsync(int id, UpdateMasterJenisBukuRequest request, CancellationToken ct)
    {
        var entity = await repository.GetByIdAsync(id, ct);
        if (entity is null) return false;
        entity.Nama = request.Nama.Trim();
        await repository.SaveChangesAsync(ct);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken ct)
    {
        var entity = await repository.GetByIdAsync(id, ct);
        if (entity is null) return false;
        repository.Remove(entity);
        await repository.SaveChangesAsync(ct);
        return true;
    }
}