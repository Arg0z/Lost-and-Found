using LostAndFoundBack.Models;
using LostAndFoundBack.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAndFoundBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IItemRepository _itemRepository;

        public ItemsController(ApplicationDbContext context, IItemRepository itemRepository)
        {
            _context = context;
            _itemRepository = itemRepository;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _itemRepository.GetAllItemsAsync();
            return Ok(items);
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: api/Items
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.item_id }, item);
        }

        // PUT: api/Items/5
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
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
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

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
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

        // GET: api/Items/location
        [HttpGet("location/{location}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByLocation(string location)
        {
            var items = await _context.Items
                                      .Where(item => item.location_found.Equals(location))
                                      .ToListAsync();
            if (items == null || items.Count == 0)
            {
                return NotFound();
            }

            return items;
        }

        [HttpGet("categories/json")]
        public async Task<IActionResult> GetCategoriesWithCountsAsJson()
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

        // GET: api/Items/location/{location}/count-by-category
        [HttpGet("location/{location}/count-by-category")]
        public async Task<ActionResult<IEnumerable<CategoryCountDto>>> GetItemsCountByCategory(string location)
        {
            var itemsCountByCategory = await _context.Items
                .Where(item => item.location_found.Equals(location))
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

            return itemsCountByCategory;
        }

        public class CategoryCountDto
        {
            public string Category { get; set; }
            public int Count { get; set; }
        }

        [HttpGet("category/{categoryName}")]
        public async Task<IActionResult> GetItemCountByCategory(string categoryName)
        {
            if (string.IsNullOrWhiteSpace(categoryName))
            {
                return BadRequest("Category name cannot be null or empty.");
            }

            var itemCount = await _context.Items
                .Where(i => i.category == categoryName)
                .CountAsync();

            return Ok(new { Category = categoryName, Count = itemCount });
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.item_id == id);
        }
    }
}
