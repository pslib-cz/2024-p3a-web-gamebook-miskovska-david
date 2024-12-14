using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;

namespace GameBook.Server.Managers
{
    public class RoomManager : IRoomManager
    {
        private readonly IBaseRepository<Room> _roomRepository;
        private readonly IMapper _mapper;
        private const string _folder = "uploads/";
        public RoomManager(IBaseRepository<Room> roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }
        public IList<RoomDto> GetAllRooms()
        {
            IList<Room> rooms = _roomRepository.GetAll();
            return _mapper.Map<IList<RoomDto>>(rooms);
        }

        public RoomDto? GetRoomById(int id)
        {
            Room? room = _roomRepository.GetById(id);
            if (room == null)
            {
                return null;
            }
            return _mapper.Map<RoomDto>(room);
        }

        public RoomDto? CreateRoom(RoomDto roomDto, IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                return null;
            }
            var path = Path.Combine(_folder, file.FileName.ToLower());

            using (var stream = new FileStream(path, FileMode.Create))
            {
              file.CopyTo(stream);
            }
            Room room = _mapper.Map<Room>(roomDto);
            room.Background = path.ToString().ToLower();
            Room createdRoom = _roomRepository.Create(room);
            createdRoom.Background = path.ToString().ToLower();
            return _mapper.Map<RoomDto>(createdRoom);
        }

        public RoomDto UpdateRoom(int id, RoomDto roomDto)
        {
            if(!_roomRepository.IsExist(id))
            {
                return null;
            }

            Room room = _mapper.Map<Room>(roomDto);
            room.RoomId = id;
            Room updatedRoom = _roomRepository.Update(room);
            return _mapper.Map<RoomDto>(updatedRoom);
        }

        public RoomDto? DeleteRoom(int id)
        {
            if (!_roomRepository.IsExist(id))
            {
                return null;
            }
            Room room = _roomRepository.GetById(id);
            RoomDto roomDto = _mapper.Map<RoomDto>(room);

            _roomRepository.Delete(id);
            return roomDto;
        }

       

    }
}
