using System.Collections.Generic;
using System.Threading.Tasks;
using LostAndFoundBack.Models;
using LostAndFoundBack.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LostAndFoundBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;

        public ItemsController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            var items = await _itemRepository.GetAllItemsAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _itemRepository.GetItemByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult> AddItem([FromBody] Item item)
        {
            await _itemRepository.AddItemAsync(item);
            return CreatedAtAction(nameof(GetItem), new { id = item.item_id }, item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItem(int id, [FromBody] Item item)
        {
            if (id != item.item_id)
            {
                return BadRequest();
            }
            await _itemRepository.UpdateItemAsync(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            await _itemRepository.DeleteItemAsync(id);
            return NoContent();
        }
    }
}
