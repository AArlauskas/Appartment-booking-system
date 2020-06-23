using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
﻿using Microsoft.AspNetCore.Authorization;
using Sourcery.Booking.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sourcery.Booking.Models.Responses;
using Sourcery.Booking.WebAPI.Responses;

namespace Sourcery.Booking.WebAPI.Controllers
{
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly BookingContext _context;

        public CategoryController(BookingContext context) 
        {
            _context = context;
        }
  
        [HttpGet]
        [HttpGet, Route("api/category/all")]
        [Authorize(Roles = "Admin,User")]
        public async Task<List<GetAllCategoriesResponse>> GetAll()
        {
            return await _context.Categories.Include(category => category.CategoryTags)
                .Select(c => new GetAllCategoriesResponse
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    Color = c.Color,
                    ParentId = c.ParentId,
                    Tags = _context.CategoryTags.Include(temp => temp.Category).Where(temp => temp.CategoryId == c.Id).Select(temp => temp.Tag.Name).ToList(),
                    SchedulerEvents = _context.SchedulerEvent.Where(
                        s => s.CategoryId.Equals(c.Id)
                    ).ToList()
                }
                ).ToListAsync();
        }

        [HttpGet, Route("api/category/get")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<Category>> GetOneTag([FromQuery] int id)
        {
            var Category = await _context.Categories
                                               .FirstOrDefaultAsync(Category => Category.Id == id);

            if (Category == null)
            {
                return NotFound();
            }

            Category.SchedulerEvents = _context.SchedulerEvent
                                       .Where(a => a.CategoryId == id).ToArray();
            Category.CategoryTags = _context.CategoryTags
                                    .Where(a => a.CategoryId == id).ToList();
            Category.ParentCategory = _context.Categories
                                      .Where(a => a.ParentId == id).FirstOrDefault();

            return Ok(Category);
        }

        [HttpGet, Route("api/category/names")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<List<string>>> GetNames()
        {
            List<string> categoryNames = new List<string>();
            categoryNames = await _context.Categories.Where(category => category.ParentId == null).Select(category => category.Name).ToListAsync();
            return categoryNames;
        }
        
        [HttpPost, Route("api/category/add")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<GetAllCategoriesResponse>> Add([FromBody] AddCategoryRequest request)
        {

            var newCategory = new Category()
            {
                Name = request.Name,
                Description = request.Description,
                Color = request.Color,
                ParentId = request.ParentId,
            };

            newCategory.SchedulerEvents = new List<SchedulerEvent>();
            var categoryTags = new List<CategoryTag>();
            if(request.tags != null)
            {
                request.tags.ForEach(tag =>
                {
                    CategoryTag categoryTag = new CategoryTag();
                    categoryTag.CategoryId = newCategory.Id;
                    categoryTag.TagId = _context.Tags.First(temp => temp.Name == tag).Id;
                    categoryTags.Add(categoryTag);
                    _context.CategoryTags.Add(categoryTag);
                });
            }
            newCategory.CategoryTags = categoryTags;
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();

            var response = new GetAllCategoriesResponse();
            response.Id = newCategory.Id;
            response.Name = newCategory.Name;
            response.ParentId = request.ParentId;
            response.SchedulerEvents = newCategory.SchedulerEvents.ToList();
            response.Tags = request.tags;
            response.Color = newCategory.Color;
            response.Description = newCategory.Description;
            return Ok(response);
        }

        [HttpDelete, Route("api/category/delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> Delete([FromRoute] int id)
        {
            var category = _context.Categories.Include(temp => temp.Categories)
                                         .FirstOrDefault(x => x.Id == id);
            if (category == null)
            {
                return NoContent();
            }

            foreach(var temp in category.Categories)
            {
                if(temp.ParentId != null)
                {
                    _context.Categories.Remove(temp);
                }
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete, Route("api/category/deleteAll")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> DeleteAll([FromQuery] int id)
        {
            _context.Database.ExecuteSqlCommand("TRUNCATE TABLE Categories");
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpPut, Route("api/category/update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<GetAllCategoriesResponse>> Update([FromRoute] int id,[FromBody] AddCategoryRequest request)
        {
            var oldcategory = _context.Categories
                                         .FirstOrDefault(x => x.Id == request.Id);
            if (oldcategory == null)
            {
                return NotFound();
            }

            oldcategory.Name = request.Name;
            oldcategory.Description = request.Description;
            oldcategory.ParentId = request.ParentId;
            oldcategory.Color = request.Color;

            if(request.tags != null)
            {
                var categoryTags = new List<CategoryTag>();
                var oldTags = _context.CategoryTags.Where(temp => temp.CategoryId == oldcategory.Id);
                foreach(var item in oldTags)
                {
                    _context.CategoryTags.Remove(item);
                }
                request.tags.ForEach(tag =>
                {
                    CategoryTag categoryTag = new CategoryTag();
                    categoryTag.CategoryId = oldcategory.Id;
                    categoryTag.TagId = _context.Tags.First(temp => temp.Name == tag).Id;
                    categoryTags.Add(categoryTag);
                    _context.CategoryTags.Add(categoryTag);
                });
                oldcategory.CategoryTags = categoryTags;
            }
            if(oldcategory.SchedulerEvents == null)
            {
                oldcategory.SchedulerEvents = new List<SchedulerEvent>();
            }
            var response = new GetAllCategoriesResponse();
            response.Id = oldcategory.Id;
            response.Name = oldcategory.Name;
            response.ParentId = request.ParentId;
            response.SchedulerEvents = oldcategory.SchedulerEvents.ToList();
            response.Tags = request.tags;
            response.Color = oldcategory.Color;
            response.Description = oldcategory.Description;

            await _context.SaveChangesAsync();

            return Ok(response);
        }
        
    }
}
