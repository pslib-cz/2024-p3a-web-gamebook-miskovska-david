using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Data;
using GameBook.Server.Models;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private const string _folder = "Uploads/Rooms";
        private readonly ApplicationDbContext _context;
        public RoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("rooms")]
        public IActionResult Get()
        {
            var rooms = _context.Rooms.ToList();
            return Ok(rooms);
        }

        [HttpGet("rooms/{id}")]
        public IActionResult GetById(int id)
        {
            var room = _context.Rooms.FirstOrDefault(r => r.RoomId == id);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpPut("rooms/{id}")]
        public IActionResult Update(int id, Room room)
        {
            var roomToUpdate = _context.Rooms.FirstOrDefault(r => r.RoomId == id);
            if (roomToUpdate == null)
            {
                return NotFound();
            }
            roomToUpdate.Background = room.Background;
            roomToUpdate.Dialogs = room.Dialogs;
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("rooms")]
        public async Task<IActionResult> Upload(IFormFile file, List<string> dialogs)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Soubor je prázdný");
            }
            var path = Path.Combine(_folder, file.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            Room room = new Room
            {
                Background = path,
                Dialogs = dialogs,

            };

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();


            return Ok();
        }

        [HttpDelete("rooms/{id}")]
        public IActionResult Delete(int id)
        {
            var room = _context.Rooms.FirstOrDefault(r => r.RoomId == id);
            if (room == null)
            {
                return NotFound();
            }
            _context.Rooms.Remove(room);
            _context.SaveChanges();
            return Ok();
        }
    }
}
