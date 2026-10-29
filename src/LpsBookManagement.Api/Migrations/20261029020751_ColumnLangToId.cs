using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LpsBookManagement.Api.Migrations
{
    /// <inheritdoc />
    public partial class ColumnLangToId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_books_book_types_book_type_id",
                table: "books");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "books",
                newName: "judul");

            migrationBuilder.RenameColumn(
                name: "release_date",
                table: "books",
                newName: "tanggal_rilis");

            migrationBuilder.RenameColumn(
                name: "page_count",
                table: "books",
                newName: "jumlah_halaman");

            migrationBuilder.RenameColumn(
                name: "book_type_id",
                table: "books",
                newName: "jenis_buku_id");

            migrationBuilder.RenameColumn(
                name: "author",
                table: "books",
                newName: "penulis");

            migrationBuilder.RenameIndex(
                name: "IX_books_book_type_id",
                table: "books",
                newName: "IX_books_jenis_buku_id");

            migrationBuilder.RenameColumn(
                name: "changed_at",
                table: "book_history",
                newName: "tanggal_perubahan");

            migrationBuilder.AddForeignKey(
                name: "FK_books_book_types_jenis_buku_id",
                table: "books",
                column: "jenis_buku_id",
                principalTable: "book_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_books_book_types_jenis_buku_id",
                table: "books");

            migrationBuilder.RenameColumn(
                name: "tanggal_rilis",
                table: "books",
                newName: "release_date");

            migrationBuilder.RenameColumn(
                name: "penulis",
                table: "books",
                newName: "author");

            migrationBuilder.RenameColumn(
                name: "jumlah_halaman",
                table: "books",
                newName: "page_count");

            migrationBuilder.RenameColumn(
                name: "judul",
                table: "books",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "jenis_buku_id",
                table: "books",
                newName: "book_type_id");

            migrationBuilder.RenameIndex(
                name: "IX_books_jenis_buku_id",
                table: "books",
                newName: "IX_books_book_type_id");

            migrationBuilder.RenameColumn(
                name: "tanggal_perubahan",
                table: "book_history",
                newName: "changed_at");

            migrationBuilder.AddForeignKey(
                name: "FK_books_book_types_book_type_id",
                table: "books",
                column: "book_type_id",
                principalTable: "book_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
