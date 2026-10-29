using LpsBookManagement.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LpsBookManagement.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<MasterJenisBuku> MasterJenisBukus => Set<MasterJenisBuku>();
    public DbSet<Buku> Bukus => Set<Buku>();
    public DbSet<BukuHistory> BookHistories => Set<BukuHistory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(AppDbContext).Assembly);
    }
}