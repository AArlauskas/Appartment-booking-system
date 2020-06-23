﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Sourcery.Booking.WebAPI;

namespace Sourcery.Booking.WebAPI.Migrations
{
    [DbContext(typeof(BookingContext))]
    [Migration("20200518114124_add")]
    partial class add
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Sourcery.Booking.Models.Category", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<string>("Color")
                    .HasColumnType("nvarchar(9)")
                    .HasMaxLength(9);

                b.Property<string>("Description")
                    .HasColumnType("nvarchar(256)")
                    .HasMaxLength(256);

                b.Property<string>("Name")
                    .HasColumnType("nvarchar(50)")
                    .HasMaxLength(50);

                b.Property<int?>("ParentId")
                    .HasColumnType("int");

                b.HasKey("Id");

                b.HasIndex("ParentId");

                b.ToTable("Categories");

                b.HasData(
                    new
                    {
                        Id = 1,
                        Color = "#DC143C",
                        Description = "It's in street A",
                        Name = "Appratment 1",
                        ParentId = 2
                    },
                    new
                    {
                        Id = 2,
                        Color = "#DC143C",
                        Description = "It's in street B",
                        Name = "Appratment 2"
                    },
                    new
                    {
                        Id = 3,
                        Color = "#DC143C",
                        Description = "It's in street C",
                        Name = "Appratment 3",
                        ParentId = 1
                    },
                    new
                    {
                        Id = 4,
                        Color = "#DC143C",
                        Description = "It's in street D",
                        Name = "Appratment 4",
                        ParentId = 1
                    });
            });

            modelBuilder.Entity("Sourcery.Booking.Models.CategoryTag", b =>
            {
                b.Property<int>("CategoryId")
                    .HasColumnType("int");

                b.Property<int>("TagId")
                    .HasColumnType("int");

                b.HasKey("CategoryId", "TagId");

                b.HasIndex("TagId");

                b.ToTable("CategoryTags");

                b.HasData(
                    new
                    {
                        CategoryId = 1,
                        TagId = 1
                    });
            });

            modelBuilder.Entity("Sourcery.Booking.Models.SchedulerEvent", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<int?>("CategoryId")
                    .HasColumnType("int");

                b.Property<DateTime>("End")
                    .HasColumnType("datetime2");

                b.Property<bool>("IsApproved")
                    .HasColumnType("bit");

                b.Property<DateTime>("Start")
                    .HasColumnType("datetime2");

                b.Property<string>("Title")
                    .HasColumnType("nvarchar(9)")
                    .HasMaxLength(9);

                b.HasKey("Id");

                b.HasIndex("CategoryId");

                b.ToTable("SchedulerEvent");

                b.HasData(
                    new
                    {
                        Id = 1,
                        CategoryId = 1,
                        End = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        IsApproved = false,
                        Start = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        Title = "Barley"
                    },
                    new
                    {
                        Id = 4,
                        CategoryId = 1,
                        End = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        IsApproved = true,
                        Start = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        Title = "Sun"
                    },
                    new
                    {
                        Id = 2,
                        CategoryId = 2,
                        End = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        IsApproved = false,
                        Start = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        Title = "Trip"
                    },
                    new
                    {
                        Id = 3,
                        CategoryId = 2,
                        End = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        IsApproved = true,
                        Start = new DateTime(2020, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                        Title = "Neutron"
                    });
            });

            modelBuilder.Entity("Sourcery.Booking.Models.Tag", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int")
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<string>("Name")
                    .IsRequired()
                    .HasColumnType("nvarchar(50)")
                    .HasMaxLength(50);

                b.HasKey("Id");

                b.ToTable("Tags");

                b.HasData(
                    new
                    {
                        Id = 1,
                        Name = "Appartments"
                    },
                    new
                    {
                        Id = 2,
                        Name = "Laptop"
                    });
            });

            modelBuilder.Entity("Sourcery.Booking.Models.Category", b =>
            {
                b.HasOne("Sourcery.Booking.Models.Category", "ParentCategory")
                    .WithMany("Categories")
                    .HasForeignKey("ParentId")
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity("Sourcery.Booking.Models.CategoryTag", b =>
            {
                b.HasOne("Sourcery.Booking.Models.Category", "Category")
                    .WithMany("CategoryTags")
                    .HasForeignKey("CategoryId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("Sourcery.Booking.Models.Tag", "Tag")
                    .WithMany("CategoryTags")
                    .HasForeignKey("TagId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
            });

            modelBuilder.Entity("Sourcery.Booking.Models.SchedulerEvent", b =>
            {
                b.HasOne("Sourcery.Booking.Models.Category", "Category")
                    .WithMany("SchedulerEvents")
                    .HasForeignKey("CategoryId");
            });
#pragma warning restore 612, 618
        }
    }
}
