using GameBook.Server.Interfaces;
using GameBook.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerManager _playerManager;

        public PlayerController(IPlayerManager playerManager)
        {
            _playerManager = playerManager;
        }



        [HttpGet("players")]
        public async Task<IActionResult> GetAll()
        {
            var player = await _playerManager.GetAllPlayers();
            return Ok(player);
        }



        [HttpGet("players/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Player? player = await _playerManager.GetPlayerById(id);
            if (player == null)
            {
                return NotFound();
            }
            return Ok(player);
        }



        [HttpPost("players")]
        public async Task<IActionResult> CreatePlayer([FromForm] Player playerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Player? createdPlayer = await _playerManager.CreatePlayer(playerDto);
            return CreatedAtAction(nameof(GetById), new { id = createdPlayer?.PlayerId }, createdPlayer);
        }




        [HttpPut("players/{id}")]
        public async Task<IActionResult> UpdatePlayer(int id, [FromBody] Player playerDto)
        {

            Player? updatedPlayer = await _playerManager.UpdatePlayer(id, playerDto);
            if (updatedPlayer == null)
            {
                return NotFound();
            }
            return Ok(updatedPlayer);
        }



        [HttpDelete("players/{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            Player? deletedPlayer = await _playerManager.DeletePlayer(id);
            if (deletedPlayer == null)
            {
                return NotFound();
            }
            return Ok(deletedPlayer);
        }
    }
}
