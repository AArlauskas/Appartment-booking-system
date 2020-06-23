using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sourcery.Booking.Models;
using System.Collections.Generic;
using System.Linq;

namespace Sourcery.Booking.WebAPI.EntityConfigurations
{
    internal class CategoryEntityConfiguration : IEntityTypeConfiguration<Category>
    {
        private Dictionary<int, Category> Categories;
        public CategoryEntityConfiguration(Dictionary<int, Category> categories)
        {
            Categories = categories;
        }
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Color).HasMaxLength(7);
            builder.Property(c => c.Name).HasMaxLength(50);
            builder.Property(c => c.Description).HasMaxLength(256);

            builder.HasMany(c => c.SchedulerEvents)
                .WithOne(c => c.Category)
                .HasForeignKey(c => c.CategoryId);
            
            builder.HasMany(c => c.Categories)
                .WithOne(c => c.ParentCategory)
                .HasForeignKey(c => c.ParentId)
                .Metadata.DeleteBehavior = DeleteBehavior.Restrict;

            SeedData(builder);
        }
        private void SeedData(EntityTypeBuilder<Category> builder)
        {
            builder.HasData(Categories.Select(x => x.Value).ToArray());
        }
    }

}
