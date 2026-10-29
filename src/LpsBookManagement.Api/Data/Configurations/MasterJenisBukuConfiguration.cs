using LpsBookManagement.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LpsBookManagement.Api.Data.Configurations;

public class MasterJenisBukuConfiguration
    : IEntityTypeConfiguration<MasterJenisBuku>
{
    public void Configure(
        EntityTypeBuilder<MasterJenisBuku> builder)
    {
        builder.ToTable("book_types");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Nama)
            .HasColumnName("nama")
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(x => x.Nama)
            .IsUnique();
    }
}