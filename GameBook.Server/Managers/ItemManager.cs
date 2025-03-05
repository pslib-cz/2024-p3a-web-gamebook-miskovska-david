using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;

namespace GameBook.Server.Managers
{
    public class ItemManager: IItemManager
    {
        /// <summary>
        /// Přístup k <see cref="Item"/> entitě v databázi.
        /// </summary>
        private readonly IItemRepository _itemRepository;
        /// <summary>
        /// Mapper pro mapování (convertovaní) mezi entitami a DTO.
        /// </summary>
        private readonly IMapper _mapper;
        /// <summary>
        /// Cesta ke složce, kde se ukládají obrázky.
        /// </summary>
        private const string _folder = "wwwroot/uploads/";

        public ItemManager(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Vrátí všechny položky z databazé a namapuje je na DTO.
        /// </summary>
        /// <returns>
        /// List <see cref="ItemDto"/> objektů reprezentujcí předměty
        /// </returns>
        public async Task<IList<Item>> GetAllItems()
        {
            IList<Item> items = await _itemRepository.GetAll();
            return _mapper.Map<IList<Item>>(items);
        }

        /// <summary>
        /// Vrátí předmět podle zadaného ID.
        /// </summary>
        /// <param name="id">Id předmětu, který chceme vrátit.</param>
        /// <returns>
        /// <see cref="Item"/> objekt pokud id existuje; jinak <c>null</c>.
        /// </returns>

        public async Task<Item> GetItemById(int id)
        {
            Item? item = await _itemRepository.GetById(id);
            if (item == null)
            {
                return null;
            }
            return _mapper.Map<Item>(item);
        }


        /// <summary>
        /// Vytvoří nový předmět v databázi a uloží obrázek do složky.
        /// </summary>
        /// <param name="itemDto">DTO obsahujcí detaily k vytvoření předmětu</param>
        /// <param name="file">Obrázek k nahraní jako pozadí</param>
        /// <returns>
        /// <see cref="ItemDto"/> reprezentujcí vytvořený předmět; pokud se nepovede vytvořit <c>null</c>
        /// </returns>
        public async Task<Item?> CreateItem(Item item, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }
            var path = Path.Combine(_folder, file.FileName.ToLower());

            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            Item newItem = _mapper.Map<Item>(item);
            newItem.Background = path.ToString().ToLower().Replace("wwwroot/", "");
            Item createdItem = await _itemRepository.Create(newItem);
            createdItem.Background = path.ToString().ToLower();
            return _mapper.Map<Item>(createdItem);
        }

        /// <summary>
        /// Aktualizuje předmět v databázi.
        /// </summary>
        /// <param name="id">Id předmětu co chceme změnit</param>
        /// <param name="roomDto">DTO obsahujcí detaily k předmětu</param>
        /// <returns>
        /// <see cref="ItemDto"/> reprezentujcí změněný předmět; pokud id neexistuje <c>null</c>
        /// </returns>

        public async Task<Item> UpdateItem(int id, Item item)
        {
            if (! await _itemRepository.IsExist(id))
            {
                return null;
            }

            Item newItem = _mapper.Map<Item>(item);
            newItem.ItemId = id;
            Item updatedItem = await _itemRepository.Update(newItem);
            return _mapper.Map<Item>(updatedItem);
        }

        /// <summary>
        /// Smaže předmět z databáze.
        /// </summary>
        /// <param name="id">Id předmětu co chceme odstranit</param>
        /// <returns>
        /// <see cref="Item"/> odstraněno předmětu; pokud id neexistuje <c>null</c>
        /// </returns>
        public async Task<Item?> DeleteItem(int id)
        {
            if (! await _itemRepository.IsExist(id))
            {
                return null;
            }
            Item item = await _itemRepository.GetById(id);
            Item itemDto = _mapper.Map<Item>(item);

            _itemRepository.Delete(id);
            return itemDto;
        }
    }
}
