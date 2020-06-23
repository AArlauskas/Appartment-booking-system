using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sourcery.Booking.WebAPI.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { null, "651 S Wells St, Chicago, IL 60607", "Room-#651-blue" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { null, "678 N Orleans St, Chicago, IL 60654", "Appartment-#678" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Color", "Description", "Name", "ParentId" },
                values: new object[] { null, null, "Dell Laptop", null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { "#00BFFF", "Near window", "Bed 1" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Color", "Description", "Name", "ParentId" },
                values: new object[] { "#00BFFF", null, "Bed 2", 1 });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { "#07ed1d", "Single bed", "Room Green" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Description", "Name", "ParentId" },
                values: new object[,]
                {
                    { 7, "#c33752", "Single bed", "Red Room", 2 },
                    { 8, "#B0BF1A", "Intel I7-10810U, 16GB, 2133 MHz, LPDDR3", "Latitude 9510", 3 },
                    { 9, "#3c9f95", "Intel® Core™ Processor i7-9850H, 32GB,2x16GB, 2666MHz DDR4", "Precision 5540", 3 }
                });

            migrationBuilder.InsertData(
                table: "CategoryTags",
                columns: new[] { "CategoryId", "TagId" },
                values: new object[,]
                {
                    { 2, 1 },
                    { 3, 2 }
                });

            migrationBuilder.UpdateData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CategoryId", "End", "Start", "Title" },
                values: new object[] { 4, new DateTime(2020, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "John Wick" });

            migrationBuilder.UpdateData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CategoryId", "End", "IsApproved", "Start", "Title" },
                values: new object[] { 5, new DateTime(2020, 6, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), true, new DateTime(2020, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Trump" });

            migrationBuilder.UpdateData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "End", "Start", "Title" },
                values: new object[] { 6, new DateTime(2020, 6, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 6, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Arnold Schwarzenegger" });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 3, "2 beds" },
                    { 4, "Dell" }
                });

            migrationBuilder.InsertData(
                table: "CategoryTags",
                columns: new[] { "CategoryId", "TagId" },
                values: new object[] { 1, 3 });

            migrationBuilder.InsertData(
                table: "CategoryTags",
                columns: new[] { "CategoryId", "TagId" },
                values: new object[] { 3, 4 });

            migrationBuilder.UpdateData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryId", "End", "IsApproved", "Start", "Title" },
                values: new object[] { 7, new DateTime(2020, 6, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(2020, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jonas Kazlauskas" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "CategoryTags",
                keyColumns: new[] { "CategoryId", "TagId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "CategoryTags",
                keyColumns: new[] { "CategoryId", "TagId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "CategoryTags",
                keyColumns: new[] { "CategoryId", "TagId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "CategoryTags",
                keyColumns: new[] { "CategoryId", "TagId" },
                keyValues: new object[] { 3, 4 });

            migrationBuilder.DeleteData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { "#DC143C", "This is a category with 2 childs", "New York" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { "#DC143C", "This is also a category with 2 childs", "Chicago" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Color", "Description", "Name", "ParentId" },
                values: new object[] { "#DC143C", "It's in street C", "Appratment 3", 1 });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { "#DC143C", "It's in street D", "Appratment 4" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Color", "Description", "Name", "ParentId" },
                values: new object[] { "#DC143C", "It's in street X", "Appratment 12", 2 });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Color", "Description", "Name" },
                values: new object[] { "#DC143C", "It's in street Y", "Appratment 13" });

            migrationBuilder.UpdateData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CategoryId", "End", "Start", "Title" },
                values: new object[] { 1, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Barley" });

            migrationBuilder.UpdateData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CategoryId", "End", "IsApproved", "Start", "Title" },
                values: new object[] { 2, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Trip" });

            migrationBuilder.UpdateData(
                table: "SchedulerEvent",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "End", "Start", "Title" },
                values: new object[] { 2, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Neutron" });

            migrationBuilder.InsertData(
                table: "SchedulerEvent",
                columns: new[] { "Id", "CategoryId", "End", "IsApproved", "Start", "Title" },
                values: new object[] { 4, 1, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), true, new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sun" });
        }
    }
}
