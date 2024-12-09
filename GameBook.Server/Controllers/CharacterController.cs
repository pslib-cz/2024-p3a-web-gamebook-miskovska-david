using GameBook.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Models;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private const string _folder = "Uploads/Characters";
        private readonly ApplicationDbContext _context;
        public CharacterController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("characters")]
        public IActionResult GetAll()
        {
            var characters = _context.Characters.ToList();
            return Ok(characters);
        }

        [HttpGet("characters/{id}")]
        public IActionResult GetById(int id)
        {
            var character = _context.Characters.FirstOrDefault(c => c.CharacterId == id);
            if (character == null)
            {
                return NotFound();
            }
            return Ok(character);
        }

        [HttpPost("characters")]
        public async Task<IActionResult> Upload(IFormFile file, string name, string bio)
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
            Character character = new Character
            {
                Name = name,
                Bio = bio,
                CharImg = path,
            };
            _context.Characters.Add(character);
            await _context.SaveChangesAsync();
            return Ok(character);
        }


    }
}
