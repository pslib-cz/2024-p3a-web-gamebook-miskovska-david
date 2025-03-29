using GameBook.Server.Models;
namespace GameBook.Server.Interfaces
{
    public interface IRoomRepository: IBaseRepository<Room>
    {
        Task<string> GetRoomRoute(string type, int id);

    }
}
