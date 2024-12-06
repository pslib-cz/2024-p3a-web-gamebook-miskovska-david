using GameBook.Server.Data;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
namespace GameBook.Server.Repository
{
    public class ItemRepository: BaseRepository<Item>, IItemRepository
    {
        public ItemRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
