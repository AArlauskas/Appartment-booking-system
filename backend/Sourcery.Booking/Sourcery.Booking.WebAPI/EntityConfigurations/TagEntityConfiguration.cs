using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sourcery.Booking.Models;
using System.Collections.Generic;
using System.Linq;

namespace Sourcery.Booking.WebAPI.EntityConfigurations
{
    internal class TagEntityConfiguration : IEntityTypeConfiguration<Tag>
    {
        private List<Tag> Tags;
        public TagEntityConfiguration(List<Tag> tags)
        {
            Tags = tags;
        }
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.HasKey(t=>t.Id);
            builder.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            SeedData(builder);
        }
        private void SeedData(EntityTypeBuilder<Tag> builder)
        {
            builder.HasData(Tags);
        }
    }
}
