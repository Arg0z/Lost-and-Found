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
                return CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
            }
            return BadRequest();
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
        public IActionResult GetClaimStatuses()
        {
            return Ok(Enum.GetNames(typeof(ClaimStatuses)));
        }
        private bool ClaimExists(int id)
        {
            return _context.Claims.Any(e => e.ClaimId == id);
        }
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