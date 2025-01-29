using GameBook.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Models;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> GetAll()
        {
            var characters = _context.Characters.ToListAsync();
            return Ok(characters);
        }

        [HttpGet("characters/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var character = _context.Characters.FirstOrDefaultAsync(c => c.CharacterId == id);
            if (character == null)
            {
                return NotFound();
            }
            return Ok(character);
        }

        [HttpPut("characters/{id}")]
        public async Task<IActionResult> Update(Character character) {
            var characterToUpdate = _context.Characters.FirstOrDefault(c => c.CharacterId == character.CharacterId);
            if (characterToUpdate == null)
            {
                return NotFound();
            }
            characterToUpdate.Name = character.Name;
            characterToUpdate.Bio = character.Bio;
            characterToUpdate.CharImg = character.CharImg;
            await _context.SaveChangesAsync();
            return Ok(characterToUpdate);
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
                hp = 100
            };
            _context.Characters.Add(character);
            await _context.SaveChangesAsync();
            return Ok(character);
        }

        [HttpDelete("characters/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var character = _context.Characters.FirstOrDefault(c => c.CharacterId == id);
            if (character == null)
            {
                return NotFound();
            }
            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
