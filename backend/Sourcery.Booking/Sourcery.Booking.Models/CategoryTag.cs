﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Sourcery.Booking.Models
{
    public class CategoryTag
    {
        public int CategoryId { get; set; }
        public Category Category{ get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
