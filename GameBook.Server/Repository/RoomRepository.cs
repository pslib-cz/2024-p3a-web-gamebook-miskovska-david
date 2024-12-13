using GameBook.Server.Data;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
namespace GameBook.Server.Repository
{
    public class RoomRepository: BaseRepository<Room>, IRoomRepository
    {
        public RoomRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
