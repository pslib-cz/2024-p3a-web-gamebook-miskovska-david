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

        public async Task<string> GetRoomRoute(string type, int id)
        {
            if (id == 11)
                return string.Format("/city-cross");
            if (id == 34)
                return string.Format("/dnd");

            return string.Format($"/{type}/{id}");
        }
    }
}
