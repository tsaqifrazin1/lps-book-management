using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LpsBookManagement.Api.Migrations
{
    /// <inheritdoc />
    public partial class LowerCaseColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "book_types",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "book_history",
                newName: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "book_types",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "book_history",
                newName: "Id");
        }
    }
}
