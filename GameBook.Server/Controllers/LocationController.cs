using GameBook.Server.Data;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {

        
        private readonly ILocationManager _locationManager;

        public LocationController(ILocationManager locationManager)
        {
            _locationManager = locationManager;
        }

       

        [HttpGet("locations")]
        public async Task<IActionResult> GetAll()
        {
            var items = await _locationManager.GetAllLocations();
            return Ok(items);
        }

        

        [HttpGet("locations/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Location? location = await _locationManager.GetLocationById(id);
            if (location == null)
            {
                return NotFound();
            }
            return Ok(location);
        }

        

        [HttpPost("locations")]
        public async Task<IActionResult> CreateLocation([FromForm] Location locationDto, IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Location? createdLocation = await _locationManager.CreateLocation(locationDto, file);
            return CreatedAtAction(nameof(GetById), new { id = createdLocation?.LocationId }, createdLocation);
        }


        

        [HttpPut("locations/{id}")]
        public async Task<IActionResult> UpdateLocation(int id, [FromBody] Location locationDto)
        {

            Location? updatedLocation = await _locationManager.UpdateLocation(id, locationDto);
            if (updatedLocation == null)
            {
                return NotFound();
            }
            return Ok(updatedLocation);
        }

        

        [HttpDelete("locations/{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            Location? deletedLocation = await _locationManager.DeleteLocation(id);
            if (deletedLocation == null)
            {
                return NotFound();
            }
            return Ok(deletedLocation);
        }
    }
}
