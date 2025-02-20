using GameBook.Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Models;
using Microsoft.EntityFrameworkCore;
using GameBook.Server.Interfaces;
using GameBook.Server.Managers;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {

        
        private readonly ICharacterManager _characterManager;

        public CharacterController(ICharacterManager character)
        {
            _characterManager = character;
        }

    

        [HttpGet("characters")]
        public async Task<IActionResult> GetAll()
        {
            var character = await _characterManager.GetAllCharacters();
            return Ok(character);
        }

        

        [HttpGet("characters/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Character? character = await _characterManager.GetCharacterById(id);
            if (character == null)
            {
                return NotFound();
            }
            return Ok(character);
        }

        

        [HttpPost("characters")]
        public async Task<IActionResult> CreateCharacter([FromForm] Character characterDto, IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Character? createdCharacter = await _characterManager.CreateCharacter(characterDto, file);
            return CreatedAtAction(nameof(GetById), new { id = createdCharacter?.CharacterId }, createdCharacter);
        }


       

        [HttpPut("characters/{id}")]
        public async Task<IActionResult> UpdateCharacter(int id, [FromBody] Character characterDto)
        {

            Character? updatedCharacter = await _characterManager.UpdateCharacter(id, characterDto);
            if (updatedCharacter == null)
            {
                return NotFound();
            }
            return Ok(updatedCharacter);
        }

        

        [HttpDelete("characters/{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            Character? deletedCharacter = await _characterManager.DeleteCharacter(id);
            if (deletedCharacter == null)
            {
                return NotFound();
            }
            return Ok(deletedCharacter);
        }
    }
}
