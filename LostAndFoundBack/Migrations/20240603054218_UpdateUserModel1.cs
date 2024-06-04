using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LostAndFoundBack.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserModel1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Claims",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Claims_ItemId",
                table: "Claims",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Claims_UserId",
                table: "Claims",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Claims_AspNetUsers_UserId",
                table: "Claims",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Claims_Items_ItemId",
                table: "Claims",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "item_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Claims_AspNetUsers_UserId",
                table: "Claims");

            migrationBuilder.DropForeignKey(
                name: "FK_Claims_Items_ItemId",
                table: "Claims");

            migrationBuilder.DropIndex(
                name: "IX_Claims_ItemId",
                table: "Claims");

            migrationBuilder.DropIndex(
                name: "IX_Claims_UserId",
                table: "Claims");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Claims",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
