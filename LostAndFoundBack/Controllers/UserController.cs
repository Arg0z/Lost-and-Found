using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using LostAndFoundBack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LostAndFoundBack.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using LostAndFoundBack.DataBase;

namespace LostAndFoundBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;

        // Constructor to inject dependencies
        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, SignInManager<User> signInManager, IConfiguration configuration, ApplicationDbContext context, EmailService emailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;
            _emailService = emailService;

        }

        // POST: api/User/register
        // Registers a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.Name,
                    Email = model.Email
                };

                // Create the user with the provided password
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // Assign the "User" role to the new user
                    await _userManager.AddToRoleAsync(user, "User");
                    if (!string.IsNullOrEmpty(model.Email))
                    {
                        var subject = "Claim Submission Confirmation";
                        var message = "Your claim has been successfully submitted.";
                        await _emailService.SendEmailAsync(model.Email, subject, message);
                    }
                    return Ok(new { UserId = user.Id, UserName = user.UserName, Email = user.Email });
                }

                // Add errors to the ModelState if creation failed
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                return BadRequest(ModelState);
            }

            return BadRequest(ModelState);
        }

        // POST: api/User/login
        // Logs in a user and returns a JWT token if credentials are valid
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var result = await _signInManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    // Generate a JWT token for the authenticated user
                    var token = new JwtToken(_configuration).GenerateJwtToken(user);
                    return Ok(new { token });
                }
            }
            return Unauthorized();
        }

        // POST: api/User/logout
        // Logs out the current user
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logged out successfully." });
        }

        // GET: api/User/get-roles
        // Retrieves the roles of the currently authenticated user
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("get-roles")]
        public async Task<IActionResult> GetUserRoles()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users.FindAsync(userId);

            // Get roles assigned to the user
            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }

        // GET: api/User/user-information
        // Retrieves the current user's information
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("user-information")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _context.Users.FindAsync(userId);

            return Ok(new { Id = userId, Name = user.UserName, Email = user.Email });
        }
    }
}
