using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace GameBook.Server.Managers
{
    public class RoomManager : IRoomManager
    {


        /// <summary>
        /// přístup k <see cref="Item"/> entitě v databázi
        /// </summary>
        private readonly IRoomRepository _roomRepository;
        /// <summary>
        /// Mapper pro mapování (convertovaní) mezi entitami a DTO.
        /// </summary>
        private readonly IMapper _mapper;
        /// <summary>
        /// Cesta ke složce, kde se ukládají obrázky.
        /// </summary>
        private const string _folder = "wwwroot/uploads/";
        public RoomManager(IRoomRepository roomRepository, IMapper mapper)
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

        public async Task<IList<Room>> GetAllRooms()
        {
            IList<Room> rooms = await _roomRepository.GetAll();
            return _mapper.Map<IList<Room>>(rooms);
        }

        /// <summary>
        /// Vrátí místnost podle zadaného Id.
        /// </summary>
        /// <param name="id">Id mísnosti co chceme vrátit</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt pokud id existuje; jinak <c>null</c>
        /// </returns>

        public async Task<Room?> GetRoomById(int id)
        {
            Room? room =  await _roomRepository.GetById(id);
            Room? nextRoom = await _roomRepository.GetById(id+1);
            if(nextRoom is not null)
                room.Route = await _roomRepository.GetRoomRoute(nextRoom.RoomType, nextRoom.RoomId);
            else
                room.Route = "";
            if (room == null)
            {
                return null;
            }
            return _mapper.Map<Room>(room);
        }

        /// <summary>
        /// Vytvoří novou místnost v databázi a uloží obrázek do složky
        /// </summary>
        /// <param name="roomDto">DTO s detailem o mísnosti co chceme vytvořit</param>
        /// <param name="file">Pozadí (obrázek) pro danou mísnost</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt pokud se podaří vytvořit; jinak <c>null</c>
        /// </returns>

        public async Task<Room?> CreateRoom(Room room, IFormFile file)
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
            Room newRoom = _mapper.Map<Room>(room);
            room.Background = path.ToString().ToLower().Replace("wwwroot/", "");
            Room createdRoom =  await _roomRepository.Create(newRoom);
            createdRoom.Background = path.ToString().ToLower();
            return _mapper.Map<Room>(createdRoom);
        }

        /// <summary>
        /// Aktualizuje místnost podle zadaného Id.
        /// </summary>
        /// <param name="id">Id mísnosti co chceme změnit</param>
        /// <param name="roomDto">DTO s detailem o mísnosti, kterou chceme změnit</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt reprezentujcí změněnou mísnost; pokud id neexistuje <c>null</c>
        /// </returns>

        public async Task<Room> UpdateRoom(int id, Room room)
        {
            if(!await _roomRepository.IsExist(id))
            {
                return null;
            }

            Room newRoom = _mapper.Map<Room>(room);
            newRoom.RoomId = id;
            Room updatedRoom = await _roomRepository.Update(newRoom);
            return _mapper.Map<Room>(updatedRoom);
        }

        /// <summary>
        /// Smaže místnost podle zadaného Id.
        /// </summary>
        /// <param name="id">Id mísnosti, kterou chceme smazat</param>
        /// <returns>
        /// <see cref="RoomDto"/> objekt reprezentujcí smazanou mísnost; pokud id neexistuje <c>null</c>"/>
        /// </returns>

        public async Task<Room> DeleteRoom(int id)
        {
            if (! await _roomRepository.IsExist(id))
            {
                return null;
            }
            Room room = await _roomRepository.GetById(id);
            Room roomDto = _mapper.Map<Room>(room);

            _roomRepository.Delete(id);
            return roomDto;
        }

       

    }
}
