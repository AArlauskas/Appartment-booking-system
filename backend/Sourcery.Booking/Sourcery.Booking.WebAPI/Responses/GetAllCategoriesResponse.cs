using System;
using System.Collections.Generic;
using System.Text;

namespace Sourcery.Booking.Models.Responses
{
    public class GetAllCategoriesResponse
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }

        public int? ParentId { get; set; }

        public List<string>? Tags { get; set; }

        public List<SchedulerEvent>? SchedulerEvents { get; set; }
    }
}
