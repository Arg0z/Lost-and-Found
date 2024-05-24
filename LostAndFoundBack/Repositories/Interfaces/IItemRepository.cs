using LostAndFoundBack.Models;

namespace LostAndFoundBack.Repositories.Interfaces
{
   
        public interface IItemRepository
        {
            Task<List<Item>> GetAllItemsAsync();
            Task<Item> GetItemByIdAsync(int id);
            Task AddItemAsync(Item item);
            Task UpdateItemAsync(Item item);
            Task DeleteItemAsync(int id);
        }
 }


