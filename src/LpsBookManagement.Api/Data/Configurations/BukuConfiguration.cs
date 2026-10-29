using LpsBookManagement.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LpsBookManagement.Api.Data.Configurations;

public class BukuConfiguration : IEntityTypeConfiguration<Buku>
{
    public void Configure(EntityTypeBuilder<Buku> builder)
    {
        builder.ToTable("books");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Judul)
            .HasColumnName("judul")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Penulis)
            .HasColumnName("penulis")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.JenisBukuId)
            .HasColumnName("jenis_buku_id")
            .IsRequired();

        builder.Property(x => x.TanggalRilis)
            .HasColumnName("tanggal_rilis")
            .HasColumnType("date")
            .IsRequired();

        builder.Property(x => x.JumlahHalaman)
            .HasColumnName("jumlah_halaman")
            .IsRequired();

        builder.HasOne(x => x.JenisBuku)
            .WithMany(x => x.Bukus)
            .HasForeignKey(x => x.JenisBukuId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasIndex(x => x.Judul);

        builder.HasIndex(x => x.Penulis);
    }
}