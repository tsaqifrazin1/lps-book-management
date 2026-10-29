using LpsBookManagement.Api.Models;

namespace LpsBookManagement.Api.Repositories;

public interface IBukuRepository
{
    Task<List<Buku>> SearchAsync(string? search, CancellationToken ct);
    Task<Buku?> GetByIdAsync(int id, CancellationToken ct);
    Task AddAsync(Buku entity, CancellationToken ct);
    void Remove(Buku entity);
    Task SaveChangesAsync(CancellationToken ct);
    Task AddHistoryAsync(BukuHistory history, CancellationToken ct);
}