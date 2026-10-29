using LpsBookManagement.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LpsBookManagement.Api.Data.Configurations;

public class BukuHistoryConfiguration
    : IEntityTypeConfiguration<BukuHistory>
{
    public void Configure(
        EntityTypeBuilder<BukuHistory> builder)
    {
        builder.ToTable("book_history");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(x => x.BukuId)
            .HasColumnName("buku_id")
            .IsRequired();

        builder.Property(x => x.Action)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.OldData)
            .HasColumnName("old_data")
            .HasColumnType("jsonb");

        builder.Property(x => x.NewData)
            .HasColumnName("new_data")
            .HasColumnType("jsonb");

        builder.Property(x => x.TanggalPerubahan)
            .HasColumnName("changed_at")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        builder.HasIndex(x => x.BukuId);
    }
}