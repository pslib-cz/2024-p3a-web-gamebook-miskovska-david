using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Data;
using GameBook.Server.Models;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private const string _folder = "uploads/";



        private readonly ApplicationDbContext _context;
        public RoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("rooms")]
        public async Task<IActionResult> GetAll()
        {
            var rooms = _context.Rooms.ToListAsync();
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
        public async Task<IActionResult> Upload(IFormFile file, string? specialItem)
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
                Background = path.ToLower(),
                //Dialogs = dialogs,
                SpecialItem = specialItem

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
