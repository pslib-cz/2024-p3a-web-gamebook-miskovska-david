using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBook.Server.Migrations
{
    /// <inheritdoc />
    public partial class přidáníhpdodatabázeproenemy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "hp",
                table: "Characters",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hp",
                table: "Characters");
        }
    }
}
