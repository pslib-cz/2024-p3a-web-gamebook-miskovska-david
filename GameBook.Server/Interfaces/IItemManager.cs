using GameBook.Server.Models;

namespace GameBook.Server.Interfaces
{
    public interface IItemManager
    {
        IList<ItemDto> GetAllItems();
        ItemDto? GetItemById(int id);
        ItemDto? CreateItem(ItemDto itemDto, IFormFile file);
        ItemDto UpdateItem(int id, ItemDto itemDto);
        ItemDto? DeleteItem(int id);
    }
}
