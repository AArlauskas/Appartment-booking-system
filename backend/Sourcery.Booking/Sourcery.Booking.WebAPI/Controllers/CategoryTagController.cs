using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sourcery.Booking.Models;

namespace Sourcery.Booking.WebAPI.Controllers
{
    public class CategoryTagController : Controller
    {
        private readonly BookingContext _context;

        public CategoryTagController(BookingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api/categoryTag/all")]
        public async Task<List<CategoryTag>> GetAll()
        {
            return await _context.CategoryTags
                .Select(c => new CategoryTag
                {
                    CategoryId = c.CategoryId,
                    TagId = c.TagId,
                    Category = _context.Categories
                        .Where(s => s.Id.Equals(c.CategoryId))
                        .FirstOrDefault(),
                    Tag = _context.Tags
                        .Where(s => s.Id.Equals(c.TagId))
                        .FirstOrDefault(),
                }
            ).ToListAsync();
        }

    }
}