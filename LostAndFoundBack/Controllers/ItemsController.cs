using LostAndFoundBack.DataBase;
using LostAndFoundBack.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LostAndFoundBack.Constants;
using LostAndFoundBack.DbModels;

namespace LostAndFoundBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IItemRepository _itemRepository;
        private readonly ILogger<ItemsController> _logger;

        // Constructor to inject dependencies
        public ItemsController(ApplicationDbContext context, IItemRepository itemRepository, ILogger<ItemsController> logger)
        {
            _context = context;
            _itemRepository = itemRepository;
            _logger = logger;
        }

        // GET: api/Items
        // Retrieves all items from the repository
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            try
            {
                var items = await _itemRepository.GetAllItemsAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting items.");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Items/5
        // Retrieves a specific item by its ID from the database
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                if (item == null)
                {
                    return NotFound();
                }
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting the item.");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Items
        // Creates a new item and sets its status to Unclaimed
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            try
            {
                item.Status = ItemStatuses.Unclaimed;
                _context.Items.Add(item);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetItem), new { id = item.item_id }, item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while posting the item.");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/Items/5
        // Updates a specific item by its ID
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.item_id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, "An error occurred while updating the item.");
                    throw;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the item.");
                return StatusCode(500, "Internal server error");
            }

            return NoContent();
        }

        // DELETE: api/Items/5
        // Deletes a specific item by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                if (item == null)
                {
                    return NotFound();
                }

                _context.Items.Remove(item);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the item.");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Items/location/{location}
        // Retrieves items found at a specific location
        [HttpGet("location/{location}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByLocation(string location)
        {
            try
            {
                var items = await _context.Items
                                          .Where(item => item.location_found.ToLower() == location.ToLower())
                                          .ToListAsync();
                if (items == null || items.Count == 0)
                {
                    return NotFound();
                }

                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting items by location.");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Items/location/{location}/category/{categoryName}
        // Retrieves items found at a specific location and category
        [HttpGet("location/{location}/category/{categoryName}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByLocationAndCategory(string location, string categoryName)
        {
            try
            {
                var items = await _context.Items
                                          .Where(item => item.location_found.ToLower() == location.ToLower() &&
                                                         item.category.ToLower() == categoryName.ToLower())
                                          .ToListAsync();
                if (items == null || items.Count == 0)
                {
                    return NotFound();
                }

                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting items by location and category.");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Items/categories/json
        // Retrieves a JSON list of categories with their counts
        [HttpGet("categories/json")]
        public async Task<IActionResult> GetCategoriesWithCountsAsJson()
        {
            try
            {
                var categoryCounts = await _context.Items
                    .GroupBy(i => i.category)
                    .Select(g => new
                    {
                        Category = g.Key,
                        Count = g.Count()
                    })
                    .ToListAsync();

                return new JsonResult(categoryCounts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting categories with counts.");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Items/location/{location}/count-by-category
        // Retrieves item counts by category for a specific location
        [HttpGet("location/{location}/count-by-category")]
        public async Task<ActionResult<IEnumerable<CategoryCountDto>>> GetItemsCountByCategory(string location)
        {
            try
            {
                var itemsCountByCategory = await _context.Items
                    .Where(item => item.location_found.ToLower() == location.ToLower())
                    .GroupBy(item => item.category)
                    .Select(group => new CategoryCountDto
                    {
                        Category = group.Key,
                        Count = group.Count()
                    })
                    .ToListAsync();

                if (itemsCountByCategory == null || itemsCountByCategory.Count == 0)
                {
                    return NotFound();
                }

                return Ok(itemsCountByCategory);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting item counts by category.");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Items/category/{categoryName}
        // Retrieves the count of items for a specific category
        [HttpGet("category/{categoryName}")]
        public async Task<IActionResult> GetItemCountByCategory(string categoryName)
        {
            if (string.IsNullOrWhiteSpace(categoryName))
            {
                return BadRequest("Category name cannot be null or empty.");
            }

            try
            {
                var itemCount = await _context.Items
                    .Where(i => i.category.ToLower() == categoryName.ToLower())
                    .CountAsync();

                return Ok(new { Category = categoryName, Count = itemCount });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting item count by category.");
                return StatusCode(
