using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LostAndFoundBack.Migrations
{
    /// <inheritdoc />
    public partial class ClaimStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Claims",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Claims");
        }
    }
}
