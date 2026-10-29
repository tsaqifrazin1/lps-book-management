using LpsBookManagement.Api.Data;
using LpsBookManagement.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LpsBookManagement.Api.Repositories;

public class BukuRepository(AppDbContext db) : IBukuRepository
{
    public Task<List<Buku>> SearchAsync(string? search, CancellationToken ct)
    {
        var query = db.Bukus.Include(x => x.JenisBuku).AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(x => x.Judul.Contains(term) || x.Penulis.Contains(term));
        }

        return query.OrderBy(x => x.Judul).ToListAsync(ct);
    }

    public Task<Buku?> GetByIdAsync(int id, CancellationToken ct)
    {
        return db.Bukus.Include(x => x.JenisBuku).FirstOrDefaultAsync(x => x.Id == id, ct);
    }

    public Task AddAsync(Buku entity, CancellationToken ct)
    {
        return db.Bukus.AddAsync(entity, ct).AsTask();
    }

    public void Remove(Buku entity)
    {
        db.Bukus.Remove(entity);
    }

    public Task SaveChangesAsync(CancellationToken ct)
    {
        return db.SaveChangesAsync(ct);
    }

    public Task AddHistoryAsync(BukuHistory history, CancellationToken ct)
    {
        return db.BookHistories.AddAsync(history, ct).AsTask();
    }
}