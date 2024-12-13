using GameBook.Server.Models;
namespace GameBook.Server.Interfaces
{
    public interface IRoomManager
    {
        IList<RoomDto> GetAllRooms();
        RoomDto? GetRoomById(int id);
        RoomDto? CreateRoom(RoomDto roomDto, IFormFile file);
        RoomDto UpdateRoom(int id, RoomDto roomDto);
        RoomDto? DeleteRoom(int id);

    }
}
