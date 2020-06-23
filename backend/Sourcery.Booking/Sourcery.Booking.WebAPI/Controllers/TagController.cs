using Microsoft.AspNetCore.Authorization;
﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Sourcery.Booking.Models;
using Sourcery.Booking.WebAPI.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sourcery.Booking.WebAPI.Controllers
{
    [ApiController]
    public class TagController : ControllerBase
    {
        private BookingContext _context;

        public TagController(BookingContext context)
        {
            _context = context;
        }

        [HttpGet, Route("api/tag/all")]
        [Authorize(Roles = "Admin,User")]
        public async Task<List<Tag>> GetAll()
        {
            return await _context.Tags
                .Select(s => new Tag
                {
                    Id = s.Id,
                    Name = s.Name,
                    CategoryTags = _context.CategoryTags.Include(temp => temp.Category).Include(temp => temp.Tag).Where(temp => temp.TagId == s.Id).ToList()
                }
            ).ToListAsync();
        }

        [HttpGet, Route("api/tag/get")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<Tag>> GetOneTag([FromQuery] int id)
        {
            foreach (Tag tag in _context.Tags)
            {
                if (tag.Id == id)
                {
                    return Ok(tag);
                }
            }
            return BadRequest("Id not found");
        }

        [HttpGet, Route("api/tag/getNames")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<List<string>>> GetTagNames()
        {
            List<string> tagNames = new List<string>();
            await _context.Tags.ForEachAsync(tag =>
            {
                tagNames.Add(tag.Name);
            });

            return Ok(tagNames);
        }

        [HttpPost, Route("api/tag/add")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Tag>> Add([FromBody] CreateTagRequest request)
        {
            var newTag = new Tag() { 
                Name = request.Name,
            };
            List<CategoryTag> categoryTags = new List<CategoryTag>();
            if (request.CategoryNames != null)
            {
                foreach (var item in request.CategoryNames)
                {
                    var categoryTag = new CategoryTag();
                    categoryTag.TagId = newTag.Id;
                    categoryTag.CategoryId = _context.Categories.FirstOrDefault(category => category.Name == item).Id;
                    categoryTags.Add(categoryTag);
                }
            }

            newTag.CategoryTags = categoryTags;
            _context.Tags.Add(newTag);
            _context.SaveChanges();

            return Ok(newTag);
        }
        [HttpDelete, Route("api/tag/delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> Delete([FromRoute] int id)
        {
            _context.Tags.Remove(_context.Tags.Find(id));
            _context.SaveChanges();
            return Ok(id);
        }
        [HttpDelete, Route("api/tag/deleteall")]
        public ActionResult<int> DeleteAll()
        {
            foreach (var tag in _context.Tags)
            {
                _context.Tags.Remove(tag);
            }
            _context.SaveChanges();
            return Ok("Success");
        }

        [HttpPut, Route("api/tag/update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> Update([FromRoute]int id, [FromBody] CreateTagRequest request)
        {
            Tag oldTag = _context.Tags.FirstOrDefault(x => x.Id == id);
            if(oldTag == null)
            {
                return NotFound();
            }

            var newTag = new Tag()
            {
                Name = request.Name,
            };
            List<CategoryTag> categoryTags = new List<CategoryTag>();
            foreach (var item in request.CategoryNames)
            {
                var categoryTag = new CategoryTag();
                categoryTag.TagId = newTag.Id;
                categoryTag.CategoryId = _context.Categories.FirstOrDefault(category => category.Name == item).Id;
                categoryTags.Add(categoryTag);
            }
            newTag.CategoryTags = categoryTags;
            var oldData = _context.CategoryTags.Where(temp => temp.TagId == oldTag.Id);
            foreach (var item in oldData)
            {
                _context.CategoryTags.Remove(item);
            }
            oldTag.Name = newTag.Name;
            oldTag.CategoryTags = newTag.CategoryTags;
            await _context.SaveChangesAsync();

            return Ok(oldTag);
        }
    }
}
