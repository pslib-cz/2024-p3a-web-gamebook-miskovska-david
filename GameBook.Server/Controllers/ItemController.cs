using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using  GameBook.Server.Interfaces;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemManager _itemManager;
        public ItemController(IItemManager itemManager)
        {
            _itemManager = itemManager;
        }

        [HttpGet("items")]
        public IActionResult Get()
        {
            return Ok(_itemManager.GetAllItems());
        }

        [HttpPost("items")]
        public IActionResult Post(IFormFile file)
        {
            _itemManager.Upload(file);
            return Ok();
        }
    }
}
