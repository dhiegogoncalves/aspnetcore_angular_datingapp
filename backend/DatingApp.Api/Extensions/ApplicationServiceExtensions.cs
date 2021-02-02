using AutoMapper;
using DatingApp.Api.Data;
using DatingApp.Api.Helpers;
using DatingApp.Api.Repositories;
using DatingApp.Api.Repositories.Interfaces;
using DatingApp.Api.Services;
using DatingApp.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options => options.UseSqlite(config.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}