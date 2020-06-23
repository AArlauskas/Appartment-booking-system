using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sourcery.Booking.WebAPI.Responses
{
    public class CreateTagRequest
    {
        public string Name { get; set; }

        public List<string> CategoryNames { get; set; }
    }
}
