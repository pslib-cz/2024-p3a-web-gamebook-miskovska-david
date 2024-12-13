using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Data;
using GameBook.Server.Models;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using GameBook.Server.Interfaces;
using System.Diagnostics.Contracts;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private const string _folder = "uploads/";


        private readonly IRoomManager _roomManager;

        public RoomController(IRoomManager roomManager)
        {
            _roomManager = roomManager;
        }

        [HttpGet("rooms")]
        public IActionResult GetAll()
        {
            var rooms = _roomManager.GetAllRooms();
            return Ok(rooms);
        }

        [HttpGet("rooms/{id}")]
        public IActionResult GetById(int id)
        {
            RoomDto? room = _roomManager.GetRoomById(id);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpPost("rooms")]
        public IActionResult CreateRoom([FromForm]RoomDto roomDto, IFormFile file)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            RoomDto? createdRoom = _roomManager.CreateRoom(roomDto, file);
            return CreatedAtAction(nameof(GetById), new { id = createdRoom?.RoomId }, createdRoom);
        }

        [HttpPut("rooms/{id}")]
        public IActionResult UpdateRoom(int id, [FromBody] RoomDto roomDto)
        {
            
            RoomDto? updatedRoom = _roomManager.UpdateRoom(id, roomDto);
            if (updatedRoom == null)
            {
                return NotFound();
            }
            return Ok(updatedRoom);
        }


        [HttpDelete("rooms/{id}")]
        public IActionResult DeleteRoom(int id)
        {
            RoomDto? deletedRoom = _roomManager.DeleteRoom(id);
            if (deletedRoom == null)
            {
                return NotFound();
            }
            return Ok(deletedRoom);
        }
    }
}
