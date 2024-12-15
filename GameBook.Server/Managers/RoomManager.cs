using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;

namespace GameBook.Server.Managers
{
    public class RoomManager : IRoomManager
    {
        /// <summary>
        /// přístup k <see cref="Item"/> entitě v databázi
        /// </summary>
        private readonly IBaseRepository<Room> _roomRepository;
        /// <summary>
        /// Mapper pro mapování (convertovaní) mezi entitami a DTO.
        /// </summary>
        private readonly IMapper _mapper;
        /// <summary>
        /// Cesta ke složce, kde se ukládají obrázky.
        /// </summary>
        private const string _folder = "uploads/";
        public RoomManager(IBaseRepository<Room> roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Vrátí všechny místnosti z databáze a namapuje je na DTO.
        /// </summary>
        /// <returns>
        /// List <see cref="RoomDto"/> objektů reprezentujcí mísnosti
        /// </returns>

        public IList<RoomDto> GetAllRooms()
        {
            IList<Room> rooms = _roomRepository.GetAll();
            return _mapper.Map<IList<RoomDto>>(rooms);
        }

        /// <summary>
        /// Vrátí místnost podle zadaného Id.
        /// </summary>
        /// <param name="id">Id mísnosti co chceme vrátit</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt pokud id existuje; jinak <c>null</c>
        /// </returns>

        public RoomDto? GetRoomById(int id)
        {
            Room? room = _roomRepository.GetById(id);
            if (room == null)
            {
                return null;
            }
            return _mapper.Map<RoomDto>(room);
        }

        /// <summary>
        /// Vytvoří novou místnost v databázi a uloží obrázek do složky
        /// </summary>
        /// <param name="roomDto">DTO s detailem o mísnosti co chceme vytvořit</param>
        /// <param name="file">Pozadí (obrázek) pro danou mísnost</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt pokud se podaří vytvořit; jinak <c>null</c>
        /// </returns>

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

        /// <summary>
        /// Aktualizuje místnost podle zadaného Id.
        /// </summary>
        /// <param name="id">Id mísnosti co chceme změnit</param>
        /// <param name="roomDto">DTO s detailem o mísnosti, kterou chceme změnit</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt reprezentujcí změněnou mísnost; pokud id neexistuje <c>null</c>
        /// </returns>

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

        /// <summary>
        /// Smaže místnost podle zadaného Id.
        /// </summary>
        /// <param name="id">Id mísnosti, kterou chceme smazat</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt reprezentujcí smazanou mísnost; pokud id neexistuje <c>null</c>"/>
        /// </returns>

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
