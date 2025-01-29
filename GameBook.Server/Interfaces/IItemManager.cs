using GameBook.Server.Models;

namespace GameBook.Server.Interfaces
{
    public interface IItemManager
    {
        Task<IList<Item>> GetAllItems();
        Task<Item?> GetItemById(int id);
        Task<Item?> CreateItem(Item item, IFormFile file);
        Task<Item> UpdateItem(int id, Item item);
        Task<Item?> DeleteItem(int id);
    }
}
