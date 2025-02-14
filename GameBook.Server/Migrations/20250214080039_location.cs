using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBook.Server.Migrations
{
    /// <inheritdoc />
    public partial class location : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "locationId",
                table: "Rooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_locationId",
                table: "Rooms",
                column: "locationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Locations_locationId",
                table: "Rooms",
                column: "locationId",
                principalTable: "Locations",
                principalColumn: "LocationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Locations_locationId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_locationId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "locationId",
                table: "Rooms");
        }
    }
}
