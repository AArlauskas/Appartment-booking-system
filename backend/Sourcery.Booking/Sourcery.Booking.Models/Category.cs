using System;
using System.Collections.Generic;
using System.Text;

namespace Sourcery.Booking.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }


        public ICollection<SchedulerEvent> SchedulerEvents { get; set;}
        public List<CategoryTag> CategoryTags { get; set; }
        public int? ParentId { get; set; }
        public Category ParentCategory { get; set; }
        public ICollection<Category> Categories{ get; set; }

    }
}
