using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sourcery.Booking.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sourcery.Booking.WebAPI.EntityConfigurations
{
    internal class ScheduledEventConfiguration : IEntityTypeConfiguration<SchedulerEvent>
    {
        private List<SchedulerEvent> SchedulerEvents;
        public ScheduledEventConfiguration(List<SchedulerEvent> schedulerEvents)
        {
            SchedulerEvents = schedulerEvents;
        }
        public void Configure(EntityTypeBuilder<SchedulerEvent> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Title).HasMaxLength(50);
            builder.Property(c => c.Start);
            builder.Property(c => c.End);
            builder.Property(c => c.IsApproved);
            builder.HasOne(c => c.Category)
                .WithMany(a => a.SchedulerEvents)
                .HasForeignKey(c => c.CategoryId).OnDelete(DeleteBehavior.Cascade);

            SeedData(builder);
        }
        private void SeedData(EntityTypeBuilder<SchedulerEvent> builder)
        {
            builder.HasData(SchedulerEvents);
        }
    }
}
