using Microsoft.AspNetCore.Mvc;
using LostAndFoundBack.DataBase;
using LostAndFoundBack.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using LostAndFoundBack.Constants;
using LostAndFoundBack.Migrations;

namespace LostAndFoundBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClaimsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public ClaimsController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Claims
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Claim>>> GetClaims()
        {
            return await _context.Claims.ToListAsync();
        }

        // GET: api/Claims/5
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
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostClaim(Claim claim)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                claim.UserId = user.Id;
                claim.Status = Constants.ClaimStatuses.New;
                _context.Claims.Add(claim);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
            }
            
        }


        // DELETE: api/Claims/5
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

        [HttpGet("Statuses")]
        public async Task<IActionResult> GetClaimStatuses()
        {
            return Ok(Enum.GetNames(typeof(Constants.ClaimStatuses)));
        }

        private bool ClaimExists(int id)
        {
            return _context.Claims.Any(e => e.ClaimId == id);
        }
        [HttpGet("Filters")]
        public async Task<ActionResult<IEnumerable<Claim>>> GetClaims(
            [FromQuery] int? itemId,
            [FromQuery] string? userId,
            [FromQuery] Constants.ClaimStatuses? status)
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
    }
}
