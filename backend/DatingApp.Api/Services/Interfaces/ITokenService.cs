using DatingApp.Api.Entities;

namespace DatingApp.Api.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}