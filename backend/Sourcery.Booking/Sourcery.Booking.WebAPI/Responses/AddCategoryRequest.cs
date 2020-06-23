using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sourcery.Booking.WebAPI.Responses
{
    public class AddCategoryRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }

        public int? ParentId { get; set; }

        public List<string> tags { get; set; }
    }
}
