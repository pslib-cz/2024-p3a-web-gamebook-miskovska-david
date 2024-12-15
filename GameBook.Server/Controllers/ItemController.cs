using Microsoft.AspNetCore.Mvc;
using GameBook.Server.Models;
using GameBook.Server.Interfaces;
namespace GameBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {

        /// <summary>
        ///Přístup k logice pro předměty
        /// </summary>
        private readonly IItemManager _itemManager;

        public ItemController(IItemManager itemManager)
        {
            _itemManager = itemManager;
        }

        /// <summary>
        /// Vrátí všechny předměty
        /// </summary>
        /// <returns><see cref="IActionResult"/> který obsahuje list předmětů, vracených s http 200 status kódem</returns>
        /// <response code="200">Vrací list předmětů</response>
        /// <remarks>
        /// Tento endpoint je volán pomocí GET requestu na /api/item/items
        /// </remarks>

        [HttpGet("items")]
        public IActionResult GetAll()
        {
            var items = _itemManager.GetAllItems();
            return Ok(items);
        }

        /// <summary>
        /// Vratí předmět podle zadaného Id
        /// </summary>
        /// <param name="id">Id předmětu co chceme vrátit</param>
        /// <returns><see cref="IActionResult"/> obsahujcí item podle zadaného id, vráceného pomcí HTTP 200 status kódu; pokud není nalezen vrátí HTTP 404 statu kód </returns>
        /// <response code="200">Vrací item podle zadaného id</response>
        /// <response code="404">Pokud item s daným id neexistuje</response>
        /// <remarks>
        /// Tento endpoint je volán pomocí GET requestu na /api/item/items/{id}
        /// </remarks>

        [HttpGet("items/{id}")]
        public IActionResult GetById(int id)
        {
            ItemDto? item = _itemManager.GetItemById(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        /// <summary>
        /// Vytvoří nový předmět v databázi a uloží obrázek do složky
        /// </summary>
        /// <param name="itemDto">DTO s detailem o předmětu</param>
        /// <param name="file">Obrázek předmětu</param>
        /// <returns>
        /// <see cref="IActionResult"/> obsahujcí vytvořený item, vrácený pomocí HTTP 201 status kódu; pokud se nepovede vytvořit vrátí HTTP 400 status kód
        /// </returns>
        /// <response code="201">předmět byl uspěšně vytvořený</response>
        /// <response code="400">Neplatný požadavek</response>
        /// <remarks>
        /// Tent endpoint je volán pomocí POST requestu na /api/item/items
        /// </remarks>

        [HttpPost("items")]
        public IActionResult CreateItem([FromForm] ItemDto itemDto, IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ItemDto? createdItem = _itemManager.CreateItem(itemDto, file);
            return CreatedAtAction(nameof(GetById), new { id = createdItem?.ItemId }, createdItem);
        }


        /// <summary>
        /// Aktualizuje předmět v databázi
        /// </summary>
        /// <param name="id">Id předmětu, který chceme změnit</param>
        /// <param name="itemDto">DTO s detailem o předmětu co chceme změnit</param>
        /// <returns>
        /// <see cref="IActionResult"/> obsahujcí změněný item, vrácený pomocí HTTP 200 status kódu; pokud se nepovede vrátí HTTP 404 status kód
        /// </returns>
        /// <response code="200">předmět byl uspěšně aktualizován</response>
        /// <response code="404">předmět s daným id neexistuje</response>
        /// <remarks>
        /// Tento endpoint je volán pomocí PUT requestu na /api/item/items/{id}
        /// </remarks>
        
        [HttpPut("items/{id}")]
        public IActionResult UpdateItem(int id, [FromBody] ItemDto itemDto)
        {

            ItemDto? updatedItem = _itemManager.UpdateItem(id, itemDto);
            if (updatedItem == null)
            {
                return NotFound();
            }
            return Ok(updatedItem);
        }

        /// <summary>
        /// Smaže předmět z databáze
        /// </summary>
        /// <param name="id">Id předmětu, který chceme smazat</param>
        /// <returns>
        /// <see cref="IActionResult"/> obsahujcí smazaný item, vrácený pomocí HTTP 200 status kódu; pokud se nepovede vrátí HTTP 404 status kód
        /// </returns>
        /// <response code="200">předmět byl uspěšně smazán</response>
        /// <response code="404">předmět s daným id neexistuje</response>
        /// <remarks>
        /// Tento endpoint je volán pomocí DELETE requestu na /api/item/items/{id}
        /// </remarks>

        [HttpDelete("items/{id}")]
        public IActionResult DeleteItem(int id)
        {
            ItemDto? deletedItem = _itemManager.DeleteItem(id);
            if (deletedItem == null)
            {
                return NotFound();
            }
            return Ok(deletedItem);
        }
    }
}
