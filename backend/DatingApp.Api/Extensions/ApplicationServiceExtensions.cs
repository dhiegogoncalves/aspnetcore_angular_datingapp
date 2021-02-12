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
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();

            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<LogUserActivity>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<DataContext>(options => options.UseSqlite(config.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}