using Microsoft.AspNetCore.Mvc;
using LostAndFoundBack.DataBase;
using LostAndFoundBack.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using LostAndFoundBack.Constants;
using LostAndFoundBack.DbModels;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using Claim = LostAndFoundBack.DbModels.Claim;

namespace LostAndFoundBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly EmailService _emailService;

        // Constructor to inject dependencies
        public ClaimsController(ApplicationDbContext context, UserManager<User> userManager, EmailService emailService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
        }

        // GET: api/Claims
        // Retrieves all claims from the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Claim>>> GetClaims()
        {
            return await _context.Claims.ToListAsync();
        }

        // GET: api/Claims/5
        // Retrieves a specific claim by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Claim>> GetClaim(int id)
        {
            var claim = await _context.Claims.FindAsync(id);
            if (claim == null)
            {
                return NotFound();
            }
            return claim;
        }

        // PUT: api/Claims/5
        // Updates a specific claim by its ID
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClaim(int id, Claim claim)
        {
            if (id != claim.ClaimId)
            {
                return BadRequest();
            }

            _context.Entry(claim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClaimExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Claims
        // Creates a new claim
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> PostClaim(Claim claim)
        {
            if (ModelState.IsValid)
            {
                claim.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                claim.Status = ClaimStatuses.New;
                _context.Claims.Add(claim);
                await _context.SaveChangesAsync();

                var user = await _context.Users.FindAsync(claim.UserId);
                var userEmail = user.Email; // Retrieve user's email
                if (!string.IsNullOrEmpty(userEmail))
                {
                    var subject = "Claim Submission Confirmation";
                    var message = "Your claim has been successfully submitted.";
                    await _emailService.SendEmailAsync(userEmail, subject, message);
                }

                return CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
            }

            return BadRequest();
        }

        // DELETE: api/Claims/5
        // Deletes a specific claim by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClaim(int id)
        {
            var claim = await _context.Claims.FindAsync(id);
            if (claim == null)
            {
                return NotFound();
            }

            _context.Claims.Remove(claim);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Claims/Statuses
        // Retrieves all possible claim statuses
        [HttpGet("Statuses")]
        public IActionResult GetClaimStatuses()
        {
            return Ok(Enum.GetNames(typeof(ClaimStatuses)));
        }

        // Checks if a claim exists by its ID
        private bool ClaimExists(int id)
        {
            return _context.Claims.Any(e => e.ClaimId == id);
        }

        // GET: api/Claims/Filters
        // Retrieves claims filtered by item ID, user ID, and/or status
        [HttpGet("Filters")]
        public async Task<ActionResult<IEnumerable<Claim>>> GetClaims(
            [FromQuery] int? itemId,
            [FromQuery] string? userId,
            [FromQuery] ClaimStatuses? status)
        {
            var claimsQuery = _context.Claims.AsQueryable();

            if (itemId.HasValue)
            {
                claimsQuery = claimsQuery.Where(c => c.ItemId == itemId);
            }
            if (!string.IsNullOrEmpty(userId))
            {
                claimsQuery = claimsQuery.Where(c => c.UserId == userId);
            }
            if (status.HasValue)
            {
                claimsQuery = claimsQuery.Where(c => c.Status == status);
            }

            return await claimsQuery.ToListAsync();
        }

        // GET: api/Claims/ByUser/{userId}
        // Retrieves claims associated with a specific user
        [HttpGet("ByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Claim>>> GetClaimsByUserId(string userId)
        {
            var claims = await _context.Claims.Where(c => c.UserId == userId).ToListAsync();

            if (claims == null || !claims.Any())
            {
                return NotFound();
            }

            return claims;
        }

        // GET: api/Claims/ByItem/{itemId}
        // Retrieves claims associated with a specific item
        [HttpGet("ByItem/{itemId}")]
        public async Task<ActionResult<IEnumerable<Claim>>> GetClaimsByItemId(int itemId)
        {
            var items = await _context.Claims.Where(c => c.ItemId == itemId).ToListAsync();

            if (items == null || !items.Any())
            {
                return NotFound();
            }

            return items;
        }
    }
}
