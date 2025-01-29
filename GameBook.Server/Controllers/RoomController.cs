using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Models;
using GameBook.Server.Interfaces;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {


        /// <summary>
        ///Přístup k logice pro mísnosti
        /// </summary>
        private readonly IRoomManager _roomManager;

        public RoomController(IRoomManager roomManager)
        {
            _roomManager = roomManager;
        }


        /// <summary>
        /// Vrátí všechny místnosti
        /// </summary>
        /// <returns>
        /// <see cref="IActionResult"/> který obsahuje list místností, vracených s http 200 status kódem
        /// </returns>
        /// <response code="200">Vrací list místností</response>
        /// <remarks>
        /// Tento endpoint je volán pomocí GET requestu na /api/room/rooms
        /// </remarks>
        [HttpGet("rooms")]
        public async Task<IActionResult> GetAll()
        {
            var rooms = await _roomManager.GetAllRooms();
            return Ok(rooms);
        }

        /// <summary>
        /// Vratí místnost podle zadaného Id
        /// </summary>
        /// <param name="id">Id mísnosti, kterou chceme zístak</param>
        /// <returns>
        /// <see cref="IActionResult"/> obsahujcí místnost podle zadaného id, vráceného pomcí HTTP 200 status kódu; pokud není nalezen vrátí HTTP 404 statu kód
        /// </returns>
        /// <response code="200">Vrací místnost podle zadaného id</response>
        /// <response code="404">Pokud místnost s daným id neexistuje</response>
        /// <remarks>
        /// Tento endpoint je volán pomocí GET requestu na /api/room/rooms/{id}
        /// </remarks>

        [HttpGet("rooms/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Room? room = await _roomManager.GetRoomById(id);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        /// <summary>
        /// Vytvoří novou místnost v databázi a uloží obrázek do složky
        /// </summary>
        /// <param name="roomDto">DTO s detailem o mísnosti</param>
        /// <param name="file">Pozadí (obrázek) k mísnosti</param>
        /// <returns>
        /// <see cref="IActionResult"/> obsahujcí místnost podle zadaného id, vráceného pomcí HTTP 201 status kódu; pokud se nepovede vytvořit vratí HTTP 400 status kód
        /// </returns>
        /// <response code="201">Vrací že mísnost byla uspšně vytvořena</response>
        /// <response code="400">Pokud se nepovede vytvořit místnost</response>
        /// <remarks>
        /// Tent endpoint je volán pomocí POST requestu na /api/room/rooms
        /// </remarks>

        [HttpPost("rooms")]
        public async Task<IActionResult> CreateRoom([FromForm]Room roomDto, IFormFile file)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Room? createdRoom = await _roomManager.CreateRoom(roomDto, file);
            return CreatedAtAction(nameof(GetById), new { id = createdRoom?.RoomId }, createdRoom);
        }

        /// <summary>
        /// Aktualizuje místnost v databázi
        /// </summary>
        /// <param name="id">Id mísnosti, kterou chceme upravit</param>
        /// <param name="roomDto">DTO s detailem o mísnosti, kterou chceme upravit</param>
        /// <returns>
        /// <see cref="IActionResult"/> obsahujcí místnost podle zadaného id, vráceného pomcí HTTP 200 status kódu; pokud se nepovede ji nepovede najít vratí HTTP 404 status kód
        /// </returns>
        /// <response code="200">Vrací že mísnost byla uspšně upravena</response>
        /// <response code="404">Pokud mísnost není nalezena</response>
        /// <remarks>
        /// Tent endpoint je volán pomocí PUT requestu na /api/room/rooms/{id}
        /// </remarks>


        [HttpPut("rooms/{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] Room roomDto)
        {
            
            Room? updatedRoom =  await _roomManager.UpdateRoom(id, roomDto);
            if (updatedRoom == null)
            {
                return NotFound();
            }
            return Ok(updatedRoom);
        }

        /// <summary>
        /// Smaže místnost z databáze
        /// </summary>
        /// <param name="id">Id mísnosti, kterou chceme smazat</param>
        /// <returns>
        /// <see cref="IActionResult"/> obsahujcí místnost podle zadaného id, vráceného pomcí HTTP 200 status kódu; pokud se nepovede ji najít vratí HTTP 404 status kód
        /// </returns>
        /// <response code="200">Vrací že mísnost byla uspšně smazána</response>
        /// <response code="404">Pokud mísnost není nalezena</response>
        /// <remarks>
        /// Tento endpoint je volán pomocí DELETE requestu na /api/room/rooms/{id}
        /// </remarks>

        [HttpDelete("rooms/{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            Room? deletedRoom = await _roomManager.DeleteRoom(id);
            if (deletedRoom == null)
            {
                return NotFound();
            }
            return Ok(deletedRoom);
        }
    }
}
