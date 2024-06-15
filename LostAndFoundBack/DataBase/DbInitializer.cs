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
            foreach (Roles role in Enum.GetValues(typeof(Roles)))
            {
                if (!await roleManager.RoleExistsAsync(role.ToString()))
                {
                    await roleManager.CreateAsync(new IdentityRole(role.ToString()));
                }
            }
        }
    }
}
