using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using LostAndFoundBack.Models;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LostAndFoundBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if(ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.Name,
                    Email = model.Email
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {

                    await _userManager.AddToRoleAsync(user, "User");

                    return Ok(new { UserId = user.Id, UserName = user.UserName, Email = user.Email });
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                return BadRequest(ModelState);
            }

            return BadRequest(ModelState);
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
                return Ok("Login successful.");

            if (result.IsLockedOut)
                return Unauthorized("User account locked out.");

            if (result.IsNotAllowed)
                return Unauthorized("User not allowed to sign in.");

            return Unauthorized("Invalid email or password.");
        }

        [Authorize]
        [HttpGet("get-roles")]
        public async Task<IActionResult> GetUserRoles()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }
    }
}
