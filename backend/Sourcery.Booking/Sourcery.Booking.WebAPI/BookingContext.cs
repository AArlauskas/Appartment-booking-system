using Microsoft.EntityFrameworkCore;
using Sourcery.Booking.Models;
using Sourcery.Booking.WebAPI.EntityConfigurations;
using System;
using System.Collections.Generic;

namespace Sourcery.Booking.WebAPI
{
    public class BookingContext : DbContext
    {
        public BookingContext(DbContextOptions<BookingContext> options) : base(options) {
        }

        public DbSet<Tag> Tags { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SchedulerEvent> SchedulerEvent { get; set; }
        public DbSet<CategoryTag> CategoryTags { get; set; } 


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var schedulerEvents = new List<SchedulerEvent>()
            {
                new SchedulerEvent() {Id = 1, Title = "John Wick", Start = new DateTime(2020,6,3), End = new DateTime(2020,6,10), IsApproved = false, CategoryId = 4 },
                new SchedulerEvent() {Id = 2, Title = "Trump", Start = new DateTime(2020,6,1), End = new DateTime(2020,6,5), IsApproved = true, CategoryId = 5},
                new SchedulerEvent() {Id = 3, Title = "Arnold Schwarzenegger", Start = new DateTime(2020,6,5), End = new DateTime(2020,6,7), IsApproved = true, CategoryId = 6},
                new SchedulerEvent() {Id = 4, Title = "Jonas Kazlauskas", Start = new DateTime(2020,6,3), End = new DateTime(2020,6,7), IsApproved = false, CategoryId = 7},
            };
    
            var categories = new Dictionary<int, Category>
            {
                {
                    1, new Category()
                    {
                        Id = 1,
                        Name = "Room-#651-blue",
                        Description = "651 S Wells St, Chicago, IL 60607",
                        ParentId = null,
                        SchedulerEvents = new List<SchedulerEvent>(),
                        
                    }

                },
                {    2, new Category()
                    {
                        Id = 2,
                        Name = "Appartment-#678",
                        Description = "678 N Orleans St, Chicago, IL 60654",
                        ParentId = null,
                        SchedulerEvents = new List<SchedulerEvent>(),
                    }
                },
                {    3, new Category()
                    {
                        Id = 3,
                        Name = "Dell Laptop",
                        ParentId = null,
                        SchedulerEvents = new List<SchedulerEvent>(),

                    }
                },
                {    4, new Category()
                    {
                        Id = 4,
                        Name = "Bed 1",
                        Description = "Near window",
                        Color = "#00BFFF",
                        ParentId = 1,
                        SchedulerEvents = new List<SchedulerEvent>(),
                    }
                },
                {    5, new Category()
                    {
                        Id = 5,
                        Name = "Bed 2",
                        Color = "#00BFFF",
                        ParentId = 1,
                        SchedulerEvents = new List<SchedulerEvent>(),
                    }
                },
                {    6, new Category()
                    {
                        Id = 6,
                        Name = "Room Green",
                        Description = "Single bed",
                        Color = "#07ed1d",
                        ParentId = 2,
                        SchedulerEvents = new List<SchedulerEvent>(),
                    }
                },
                {    7, new Category()
                    {
                        Id = 7,
                        Name = "Red Room",
                        Description = "Single bed",
                        Color = "#c33752",
                        ParentId = 2,
                        SchedulerEvents = new List<SchedulerEvent>(),
                    }
                },
                
                {    8, new Category()
                    {
                        Id = 8,
                        Name = "Latitude 9510",
                        Description = "Intel I7-10810U, 16GB, 2133 MHz, LPDDR3",
                        Color = "#B0BF1A",
                        ParentId = 3,
                        SchedulerEvents = new List<SchedulerEvent>(),
                    }
                },
                {    9, new Category()
                    {
                        Id = 9,
                        Name = "Precision 5540",
                        Description = "Intel® Core™ Processor i7-9850H, 32GB,2x16GB, 2666MHz DDR4",
                        Color = "#3c9f95",
                        ParentId = 3,
                        SchedulerEvents = new List<SchedulerEvent>(),
                    }
                },
            };

            var tags = new List<Tag>
            {
                new Tag()
                {
                    Id = 1,
                    Name = "Appartments",
                },
                    new Tag()
                {
                    Id = 2,
                    Name = "Laptop",
                },
                    new Tag()
                {
                    Id = 3,
                    Name = "2 beds",
                },
                    new Tag()
                {
                    Id = 4,
                    Name = "Dell",
                }
            };

            var categoryTags = new List<CategoryTag>()
            {
                new CategoryTag()
                { 
                    CategoryId = 1,
                    TagId = 1
                },
                new CategoryTag()
                {
                    CategoryId = 1,
                    TagId = 3
                },
                new CategoryTag()
                {
                    CategoryId = 2,
                    TagId = 1
                },
                new CategoryTag()
                {
                    CategoryId = 3,
                    TagId = 2
                },
                new CategoryTag()
                {
                    CategoryId = 3,
                    TagId = 4
                }
            };

            modelBuilder.ApplyConfiguration(new TagEntityConfiguration(tags));
            modelBuilder.ApplyConfiguration(new CategoryTagConfiguration(categoryTags));
            modelBuilder.ApplyConfiguration(new CategoryEntityConfiguration(categories));
            modelBuilder.ApplyConfiguration(new ScheduledEventConfiguration(schedulerEvents));
        }
    }
}
