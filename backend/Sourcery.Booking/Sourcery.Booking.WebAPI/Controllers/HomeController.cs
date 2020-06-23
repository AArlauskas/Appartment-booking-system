using Microsoft.AspNetCore.Mvc;

namespace Sourcery.Booking.WebAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
