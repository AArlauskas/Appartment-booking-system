using System.Collections;
using System.Collections.Generic;

namespace Sourcery.Booking.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }


        public List<CategoryTag> CategoryTags { get; set; }
    }
}
