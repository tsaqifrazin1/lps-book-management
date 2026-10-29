using System.Globalization;
using System.Text;
using System.Text.Json;
using LpsBookManagement.Api.DTOs;
using LpsBookManagement.Api.Models;
using LpsBookManagement.Api.Repositories;

namespace LpsBookManagement.Api.Services;

public class BukuService(IBukuRepository repository) : IBukuService
{
    public async Task<List<BukuDto>> SearchAsync(string? search, CancellationToken ct)
    {
        return (await repository.SearchAsync(search, ct)).Select(Map).ToList();
    }

    public async Task<BukuDto?> GetAsync(int id, CancellationToken ct)
    {
        var book = await repository.GetByIdAsync(id, ct);
        return book is null ? null : Map(book);
    }

    public async Task<BukuDto> CreateAsync(CreateBukuRequest request, CancellationToken ct)
    {
        var entity = new Buku
        {
            Judul = request.Judul.Trim(),
            Penulis = request.Penulis.Trim(),
            JenisBukuId = request.JenisBukuId,
            TanggalRilis = request.TanggalRilis,
            JumlahHalaman = request.JumlahHalaman
        };

        await repository.AddAsync(entity, ct);
        await repository.SaveChangesAsync(ct);

        await repository.AddHistoryAsync(new BukuHistory
        {
            BukuId = entity.Id,
            Action = "CREATE",
            NewData = JsonSerializer.Serialize(request)
        }, ct);
        await repository.SaveChangesAsync(ct);

        return await repository.GetByIdAsync(entity.Id, ct) is { } created
            ? Map(created)
            : throw new InvalidOperationException("Book was not found after creation.");
    }

    public async Task<bool> UpdateAsync(int id, UpdateBukuRequest request, CancellationToken ct)
    {
        var entity = await repository.GetByIdAsync(id, ct);
        if (entity is null) return false;

        var oldData = JsonSerializer.Serialize(Map(entity));

        entity.Judul = request.Judul.Trim();
        entity.Penulis = request.Penulis.Trim();
        entity.JenisBukuId = request.JenisBukuId;
        entity.TanggalRilis = request.TanggalRilis;
        entity.JumlahHalaman = request.JumlahHalaman;

        await repository.SaveChangesAsync(ct);
        await repository.AddHistoryAsync(new BukuHistory
        {
            BukuId = entity.Id,
            Action = "UPDATE",
            OldData = oldData,
            NewData = JsonSerializer.Serialize(request)
        }, ct);
        await repository.SaveChangesAsync(ct);

        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken ct)
    {
        var entity = await repository.GetByIdAsync(id, ct);
        if (entity is null) return false;

        var oldData = JsonSerializer.Serialize(Map(entity));
        repository.Remove(entity);
        await repository.SaveChangesAsync(ct);

        await repository.AddHistoryAsync(new BukuHistory
        {
            BukuId = id,
            Action = "DELETE",
            OldData = oldData
        }, ct);
        await repository.SaveChangesAsync(ct);

        return true;
    }

    public async Task<string> ExportCsvAsync(string? search, CancellationToken ct)
    {
        var rows = await repository.SearchAsync(search, ct);
        var sb = new StringBuilder();
        sb.AppendLine("Id,Judul,Penulis,Jenis Buku,Tanggal rilis,Jumlah Halaman");

        foreach (var x in rows)
            sb.AppendLine(string.Join(",",
                x.Id,
                Csv(x.Judul),
                Csv(x.Penulis),
                Csv(x.JenisBuku?.Nama ?? ""),
                x.TanggalRilis.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                x.JumlahHalaman));

        return sb.ToString();
    }

    private static BukuDto Map(Buku x)
    {
        return new BukuDto(x.Id, x.Judul, x.Penulis, x.JenisBukuId, x.JenisBuku?.Nama ?? "", x.TanggalRilis,
            x.JumlahHalaman);
    }

    private static string Csv(string value)
    {
        return $"\"{value.Replace("\"", "\"\"")}\"";
    }
}