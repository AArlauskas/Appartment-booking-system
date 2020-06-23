using Microsoft.EntityFrameworkCore.Migrations;

namespace Sourcery.Booking.WebAPI.Migrations
{
    public partial class UpdatedCategoryValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name", "ParentId" },
                values: new object[] { "This is a category with 2 childs", "New York", null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "This is also a category with 2 childs", "Chicago" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Description", "Name", "ParentId" },
                values: new object[,]
                {
                    { 5, "#DC143C", "It's in street X", "Appratment 12", 2 },
                    { 6, "#DC143C", "It's in street Y", "Appratment 13", 2 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name", "ParentId" },
                values: new object[] { "It's in street A", "Appratment 1", 2 });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "It's in street B", "Appratment 2" });
        }
    }
}
