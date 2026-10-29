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
            .HasColumnName("title")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Penulis)
            .HasColumnName("author")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.JenisBukuId)
            .HasColumnName("book_type_id")
            .IsRequired();

        builder.Property(x => x.TanggalRilis)
            .HasColumnName("release_date")
            .HasColumnType("date")
            .IsRequired();

        builder.Property(x => x.JumlahHalaman)
            .HasColumnName("page_count")
            .IsRequired();

        builder.HasOne(x => x.JenisBuku)
            .WithMany(x => x.Bukus)
            .HasForeignKey(x => x.JenisBukuId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}