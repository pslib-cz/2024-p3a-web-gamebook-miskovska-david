using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBook.Server.Migrations
{
    /// <inheritdoc />
    public partial class SpecialItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Background",
                table: "Rooms",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecialItem",
                table: "Rooms",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "Items",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SpecialItem",
                table: "Rooms");

            migrationBuilder.AlterColumn<string>(
                name: "Background",
                table: "Rooms",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "Items",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }
    }
}
