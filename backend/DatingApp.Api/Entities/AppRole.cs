using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DatingApp.Api.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}