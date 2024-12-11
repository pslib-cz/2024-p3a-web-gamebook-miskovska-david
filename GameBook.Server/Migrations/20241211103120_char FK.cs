using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBook.Server.Migrations
{
    /// <inheritdoc />
    public partial class charFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Characters_CharacterId",
                table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "CharacterId",
                table: "Rooms",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Characters_CharacterId",
                table: "Rooms",
                column: "CharacterId",
                principalTable: "Characters",
                principalColumn: "CharacterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Characters_CharacterId",
                table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "CharacterId",
                table: "Rooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Characters_CharacterId",
                table: "Rooms",
                column: "CharacterId",
                principalTable: "Characters",
                principalColumn: "CharacterId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
