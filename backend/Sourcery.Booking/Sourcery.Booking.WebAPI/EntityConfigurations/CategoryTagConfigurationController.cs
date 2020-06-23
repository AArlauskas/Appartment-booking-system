using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sourcery.Booking.Models;
using System.Collections.Generic;

namespace Sourcery.Booking.WebAPI.EntityConfigurations
{
    internal class CategoryTagConfiguration : IEntityTypeConfiguration<CategoryTag>
    {

        readonly List<CategoryTag> CategoryTags;
        public CategoryTagConfiguration(List<CategoryTag> categoryTags)
        {
            CategoryTags = categoryTags;
        }
        public void Configure(EntityTypeBuilder<CategoryTag> builder)
        {
            builder
                .HasKey(t => new { t.CategoryId, t.TagId });
            builder
                .HasOne(pt => pt.Category)
                .WithMany(p => p.CategoryTags)
                .HasForeignKey(pt => pt.CategoryId);
            builder
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.CategoryTags)
                .HasForeignKey(pt => pt.TagId);

            SeedData(builder);
        }
        private void SeedData(EntityTypeBuilder<CategoryTag> builder)
        {
            builder.HasData(CategoryTags);   
        }
    }

}
