using GameBook.Server.Models;
namespace GameBook.Server.Interfaces
{
    public interface IRoomManager
    {
        Task<IList<Room>> GetAllRooms();
        Task<Room?> GetRoomById(int id);
        Task<Room?> CreateRoom(Room room, IFormFile file);
        Task<Room> UpdateRoom(int id, Room room);
        Task<Room?> DeleteRoom(int id);

    }
}
