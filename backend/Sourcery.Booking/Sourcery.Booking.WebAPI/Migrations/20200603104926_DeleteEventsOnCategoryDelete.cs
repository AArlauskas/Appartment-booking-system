using Microsoft.EntityFrameworkCore.Migrations;

namespace Sourcery.Booking.WebAPI.Migrations
{
    public partial class DeleteEventsOnCategoryDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SchedulerEvent_Categories_CategoryId",
                table: "SchedulerEvent");

            migrationBuilder.AddForeignKey(
                name: "FK_SchedulerEvent_Categories_CategoryId",
                table: "SchedulerEvent",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SchedulerEvent_Categories_CategoryId",
                table: "SchedulerEvent");

            migrationBuilder.AddForeignKey(
                name: "FK_SchedulerEvent_Categories_CategoryId",
                table: "SchedulerEvent",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
