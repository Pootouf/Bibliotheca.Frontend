using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace Bibliotheca.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnimalObservation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Kingdom = table.Column<string>(type: "text", nullable: true),
                    Phylum = table.Column<string>(type: "text", nullable: true),
                    Class = table.Column<string>(type: "text", nullable: true),
                    Order = table.Column<string>(type: "text", nullable: true),
                    Family = table.Column<string>(type: "text", nullable: true),
                    Tribe = table.Column<string>(type: "text", nullable: true),
                    Genus = table.Column<string>(type: "text", nullable: true),
                    Species = table.Column<string>(type: "text", nullable: true),
                    VernacularName = table.Column<string>(type: "text", nullable: true),
                    CoverImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    ObservationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PostedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimalObservation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImageData",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ImagePath = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    AnimalObservationId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImageData_AnimalObservation_AnimalObservationId",
                        column: x => x.AnimalObservationId,
                        principalTable: "AnimalObservation",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnimalObservation_CoverImageId",
                table: "AnimalObservation",
                column: "CoverImageId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageData_AnimalObservationId",
                table: "ImageData",
                column: "AnimalObservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalObservation_ImageData_CoverImageId",
                table: "AnimalObservation",
                column: "CoverImageId",
                principalTable: "ImageData",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnimalObservation_ImageData_CoverImageId",
                table: "AnimalObservation");

            migrationBuilder.DropTable(
                name: "ImageData");

            migrationBuilder.DropTable(
                name: "AnimalObservation");
        }
    }
}
