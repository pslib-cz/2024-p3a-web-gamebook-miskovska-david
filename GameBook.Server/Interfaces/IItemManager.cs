using GameBook.Server.Models;
namespace GameBook.Server.Interfaces
{
    public interface IItemManager
    {
        IList<ItemDto> GetAllItems();
        Task<ItemDto> Upload(IFormFile file);
    }
}
