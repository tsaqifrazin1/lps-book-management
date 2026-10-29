using LpsBookManagement.Api.Data;
using LpsBookManagement.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LpsBookManagement.Api.Repositories;

public class MasterJenisBukuRepository(AppDbContext db) : IMasterJenisBukuRepository
{
    public Task<List<MasterJenisBuku>> GetAllAsync(CancellationToken ct) =>
        db.MasterJenisBukus.AsNoTracking().OrderBy(x => x.Nama).ToListAsync(ct);

    public Task<MasterJenisBuku?> GetByIdAsync(int id, CancellationToken ct) =>
        db.MasterJenisBukus.FirstOrDefaultAsync(x => x.Id == id, ct);

    public Task AddAsync(MasterJenisBuku entity, CancellationToken ct) =>
        db.MasterJenisBukus.AddAsync(entity, ct).AsTask();

    public void Remove(MasterJenisBuku entity) => db.MasterJenisBukus.Remove(entity);

    public Task SaveChangesAsync(CancellationToken ct) => db.SaveChangesAsync(ct);
}
