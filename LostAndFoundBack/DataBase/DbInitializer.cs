using LostAndFoundBack.Constants;
using LostAndFoundBack.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace LostAndFoundBack.DataBase
{
    public static class DbInitializer
    {
        public static async Task Initialize(RoleManager<IdentityRole> roleManager)
        {
            foreach (UserRoles role in Enum.GetValues(typeof(UserRoles)))
            {
                if (!await roleManager.RoleExistsAsync(role.ToString()))
                {
                    await roleManager.CreateAsync(new IdentityRole(role.ToString()));
                }
            }
        }
    }
}
