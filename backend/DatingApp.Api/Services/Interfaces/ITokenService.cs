using System.Threading.Tasks;
using DatingApp.Api.Entities;

namespace DatingApp.Api.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}