using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using GameBook.Server.Models;
using System.IO;
using SQLitePCL;
using GameBook.Server.Data;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {

        private const string _folder = "Uploads/Items";
        private readonly ApplicationDbContext _context;
        public ItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("items")]
        public IActionResult GetAll()
        {
            var items = _context.Items.ToList();
            return Ok(items);
        }

        

        [HttpGet("items/{id}")]
        public IActionResult GetById(int id) {
            var item = _context.Items.FirstOrDefault(i => i.ItemId == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }
        [HttpPut("items/{id}")]
        public async Task<IActionResult> Update(int id, Item item)
        {
            if (id != item.ItemId)
            {
                return BadRequest();
            }
            _context.Items.Update(item);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {

                return BadRequest();
            }
            return Ok();
        }

        [HttpPost("items")]
        public async Task<IActionResult> Upload(IFormFile file,string name, string description, int? price, int? dmg, int?def)
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

            Item item = new Item
            {
                Name = name,
                Description = description,
                Img = path,
                Price = price,
                Damage = dmg,
                Defence = def
            };

            _context.Items.Add(item);
            await _context.SaveChangesAsync();


            return Ok();
        }


        [HttpDelete("items/{id}")]
        public IActionResult Delete(int id)
        {
            var item = _context.Items.FirstOrDefault(i => i.ItemId == id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Items.Remove(item);
            _context.SaveChanges();
            return Ok();
        }
    }
}
