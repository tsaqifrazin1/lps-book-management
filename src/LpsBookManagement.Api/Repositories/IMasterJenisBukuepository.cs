
using LpsBookManagement.Api.Models;

namespace LpsBookManagement.Api.Repositories;

public interface IMasterJenisBukuepository
{
    Task<List<MasterJenisBuku>> GetAllAsync(CancellationToken ct);
    Task<MasterJenisBuku?> GetByIdAsync(int id, CancellationToken ct);
    Task AddAsync(MasterJenisBuku entity, CancellationToken ct);
    void Remove(MasterJenisBuku entity);
    Task SaveChangesAsync(CancellationToken ct);
}
