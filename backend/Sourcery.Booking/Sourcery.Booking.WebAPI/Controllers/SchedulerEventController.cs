using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sourcery.Booking.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sourcery.Booking.WebAPI.Controllers
{
    [ApiController]
    public class SchedulerEventController : ControllerBase
    {
        private readonly BookingContext _context;

        public SchedulerEventController(BookingContext context)
        {
            _context = context;
        }

        [HttpGet, Route("api/SchedulerEvent/all")]
        [Authorize(Roles = "Admin,User")]
        public async Task<List<SchedulerEvent>> GetAll()
        {
            return await _context.SchedulerEvent
                .Select(s => new SchedulerEvent
                {
                    Id = s.Id,
                    Title = s.Title,
                    CategoryId = s.CategoryId,
                    Start = s.Start,
                    End = s.End,
                    IsApproved = s.IsApproved
                        
                }                                           
                ).ToListAsync();
        }
        
        [HttpGet, Route("api/SchedulerEvent/get")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<SchedulerEvent>> GetOneTag([FromQuery] int id)
        {
            var SchedulerEvent = await _context.SchedulerEvent
                                               .FirstOrDefaultAsync(SchedulerEvent => SchedulerEvent.Id == id);

            if (SchedulerEvent == null)
            {
                return NotFound();
            }
            SchedulerEvent.Category = _context.Categories
                          .Where(s => s.Id == SchedulerEvent.CategoryId).FirstOrDefault();
            return Ok(SchedulerEvent);
        }
        
        [HttpPost, Route("api/SchedulerEvent/add")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<SchedulerEvent>> Add([FromBody] SchedulerEvent schedulerEvent)
        {
            if (_context.Categories.Where(s => s.Id == schedulerEvent.CategoryId).FirstOrDefault() == null)
            {
                return BadRequest("ERROR, category with Id: " + schedulerEvent.CategoryId + " doesn't exist");
            }
            
            var newSchedulerEvent = new SchedulerEvent()
            {
                Title = schedulerEvent.Title,
                Start = schedulerEvent.Start,
                End = schedulerEvent.End,
                IsApproved = schedulerEvent.IsApproved,
                CategoryId = schedulerEvent.CategoryId
            };

            _context.SchedulerEvent.Add(newSchedulerEvent);
            await _context.SaveChangesAsync();

            return Ok(newSchedulerEvent);
        }
        
        [HttpDelete, Route("api/SchedulerEvent/delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> Delete([FromRoute] int id)
        {
            var schedulerEvent = _context.SchedulerEvent
                                         .FirstOrDefault(x => x.Id == id);
            if (schedulerEvent == null)
            {
                return NoContent();
            }

            _context.SchedulerEvent.Remove(schedulerEvent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete, Route("api/SchedulerEvent/deleteAll")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> DeleteAll([FromQuery] int id)
        {
            _context.Database.ExecuteSqlCommand("TRUNCATE TABLE SchedulerEvent");
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut, Route("api/SchedulerEvent/update")]
        public async Task<ActionResult<int>> Update([FromBody] SchedulerEvent schedulerEvent)
        {
            var oldSchedulerEvent = _context.SchedulerEvent
                                         .FirstOrDefault(x => x.Id == schedulerEvent.Id);
            if (oldSchedulerEvent == null)
            {
                return NotFound();
            }

            oldSchedulerEvent.Title = schedulerEvent.Title;
            oldSchedulerEvent.Start = schedulerEvent.Start;
            oldSchedulerEvent.End = schedulerEvent.End;
            oldSchedulerEvent.IsApproved = schedulerEvent.IsApproved;
            oldSchedulerEvent.CategoryId = schedulerEvent.CategoryId;

            await _context.SaveChangesAsync();

            return Ok(oldSchedulerEvent);
        }
    }
}
