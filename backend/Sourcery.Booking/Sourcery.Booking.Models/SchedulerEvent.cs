using System;
using System.Collections.Generic;
using System.Text;

namespace Sourcery.Booking.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsApproved { get; set; }


        public int? CategoryId { get; set; }

        public Category Category { get; set; }

    }
}