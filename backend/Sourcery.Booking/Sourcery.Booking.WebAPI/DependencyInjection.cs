using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Sourcery.Booking.WebAPI
{
    public static class DependencyInjection
    {
        public static void RegisterDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<BookingContext>(options => 
                options.UseSqlServer(configuration.GetConnectionString(nameof(BookingContext)) ));
        }
    }
}
