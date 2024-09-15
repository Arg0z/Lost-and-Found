using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LostAndFoundBack.DataBase;
using LostAndFoundBack.DbModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LostAndFoundBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportedItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Constructor to inject the ApplicationDbContext
        public ReportedItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ReportedItems
        // Retrieves all reported items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportedItem>>> GetReportedItems()
        {
            return await _context.ReportedItems.ToListAsync();
        }

        // GET: api/ReportedItems/5
        // Retrieves a specific reported item by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<ReportedItem>> GetReportedItem(int id)
        {
            var reportedItem = await _context.ReportedItems.FindAsync(id);

            if (reportedItem == null)
            {
                return NotFound();
            }

            return reportedItem;
        }

        // POST: api/ReportedItems
        // Creates a new reported item; requires authentication
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<ActionResult<ReportedItem>> CreateReportedItem(ReportedItem reportedItem)
        {
            if (ModelState.IsValid)
            {
                // Assign the current user's ID to the reported item
                reportedItem.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                reportedItem.Status = Constants.ReportedItemStatuses.New;
                _context.Add(reportedItem);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetReportedItem), new { id = reportedItem.item_id }, reportedItem);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/ReportedItems/5
        // Updates a specific reported item by its ID
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditReportedItem(int id, [Bind("item_id,UserId,description,date_found,location_found,category,Status")] ReportedItem reportedItem)
        {
            if (id != reportedItem.item_id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reportedItem);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReportedItemExists(reportedItem.item_id))
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
            return BadRequest(ModelState);
        }

        // DELETE: api/ReportedItems/5
        // Deletes a specific reported item by its ID
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteReportedItem(int id)
        {
            var reportedItem = await _context.ReportedItems.FindAsync(id);
            if (reportedItem == null)
            {
                return NotFound();
            }

            _context.ReportedItems.Remove(reportedItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if a reported item exists by its ID
        private bool ReportedItemExists(int id)
        {
            return _context.ReportedItems.Any(e => e.item_id == id);
        }
    }
}
