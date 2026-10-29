using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LpsBookManagement.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddBookSearchIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_books_judul",
                table: "books",
                column: "judul");

            migrationBuilder.CreateIndex(
                name: "IX_books_penulis",
                table: "books",
                column: "penulis");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_books_judul",
                table: "books");

            migrationBuilder.DropIndex(
                name: "IX_books_penulis",
                table: "books");
        }
    }
}
