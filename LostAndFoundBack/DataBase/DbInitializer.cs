using LostAndFoundBack.Constants;
using LostAndFoundBack.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace LostAndFoundBack.DataBase
{
    public static class DbInitializer
    {
        // Method to initialize roles in the database
        public static async Task Initialize(RoleManager<IdentityRole> roleManager)
        {
            // Loop through each value of the UserRoles enum
            foreach (UserRoles role in Enum.GetValues(typeof(UserRoles)))
            {
                // Check if the role already exists in the database
                if (!await roleManager.RoleExistsAsync(role.ToString()))
                {
                    // If the role does not exist, create it
                    await roleManager.CreateAsync(new IdentityRole(role.ToString()));
                }
            }
        }
    }
}
