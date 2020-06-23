using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sourcery.Booking.WebAPI.Migrations
{
    public partial class add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 256, nullable: true),
                    Color = table.Column<string>(maxLength: 9, nullable: true),
                    ParentId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SchedulerEvent",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 9, nullable: true),
                    Start = table.Column<DateTime>(nullable: false),
                    End = table.Column<DateTime>(nullable: false),
                    IsApproved = table.Column<bool>(nullable: false),
                    CategoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchedulerEvent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchedulerEvent_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CategoryTags",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false),
                    TagId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryTags", x => new { x.CategoryId, x.TagId });
                    table.ForeignKey(
                        name: "FK_CategoryTags_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Description", "Name", "ParentId" },
                values: new object[] { 2, "#DC143C", "It's in street B", "Appratment 2", null });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Appartments" });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Laptop" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Description", "Name", "ParentId" },
                values: new object[] { 1, "#DC143C", "It's in street A", "Appratment 1", 2 });

            migrationBuilder.InsertData(
                table: "SchedulerEvent",
                columns: new[] { "Id", "CategoryId", "End", "IsApproved", "Start", "Title" },
                values: new object[] { 2, 2, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Trip" });

            migrationBuilder.InsertData(
                table: "SchedulerEvent",
                columns: new[] { "Id", "CategoryId", "End", "IsApproved", "Start", "Title" },
                values: new object[] { 3, 2, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), true, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Neutron" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Description", "Name", "ParentId" },
                values: new object[,]
                {
                    { 3, "#DC143C", "It's in street C", "Appratment 3", 1 },
                    { 4, "#DC143C", "It's in street D", "Appratment 4", 1 }
                });

            migrationBuilder.InsertData(
                table: "CategoryTags",
                columns: new[] { "CategoryId", "TagId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "SchedulerEvent",
                columns: new[] { "Id", "CategoryId", "End", "IsApproved", "Start", "Title" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Barley" },
                    { 4, 1, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), true, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sun" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentId",
                table: "Categories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryTags_TagId",
                table: "CategoryTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_SchedulerEvent_CategoryId",
                table: "SchedulerEvent",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryTags");

            migrationBuilder.DropTable(
                name: "SchedulerEvent");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
