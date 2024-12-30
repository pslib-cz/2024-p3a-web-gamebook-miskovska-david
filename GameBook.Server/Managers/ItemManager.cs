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
        private readonly IBaseRepository<Item> _itemRepository;
        /// <summary>
        /// Mapper pro mapování (convertovaní) mezi entitami a DTO.
        /// </summary>
        private readonly IMapper _mapper;
        /// <summary>
        /// Cesta ke složce, kde se ukládají obrázky.
        /// </summary>
        private const string _folder = "wwwroot/uploads/";

        public ItemManager(IBaseRepository<Item> itemRepository, IMapper mapper)
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
        public IList<ItemDto> GetAllItems()
        {
            IList<Item> items = _itemRepository.GetAll();
            return _mapper.Map<IList<ItemDto>>(items);
        }

        /// <summary>
        /// Vrátí předmět podle zadaného ID.
        /// </summary>
        /// <param name="id">Id předmětu, který chceme vrátit.</param>
        /// <returns>
        /// <see cref="ItemDto"/> objekt pokud id existuje; jinak <c>null</c>.
        /// </returns>

        public ItemDto? GetItemById(int id)
        {
            Item? item = _itemRepository.GetById(id);
            if (item == null)
            {
                return null;
            }
            return _mapper.Map<ItemDto>(item);
        }


        /// <summary>
        /// Vytvoří nový předmět v databázi a uloží obrázek do složky.
        /// </summary>
        /// <param name="itemDto">DTO obsahujcí detaily k vytvoření předmětu</param>
        /// <param name="file">Obrázek k nahraní jako pozadí</param>
        /// <returns>
        /// <see cref="ItemDto"/> reprezentujcí vytvořený předmět; pokud se nepovede vytvořit <c>null</c>
        /// </returns>
        public ItemDto? CreateItem(ItemDto itemDto, IFormFile file)
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
            Item item = _mapper.Map<Item>(itemDto);
            item.Img = path.ToString().ToLower();
            Item createdItem = _itemRepository.Create(item);
            createdItem.Img = path.ToString().ToLower();
            return _mapper.Map<ItemDto>(createdItem);
        }

        /// <summary>
        /// Aktualizuje předmět v databázi.
        /// </summary>
        /// <param name="id">Id předmětu co chceme změnit</param>
        /// <param name="roomDto">DTO obsahujcí detaily k předmětu</param>
        /// <returns>
        /// <see cref="ItemDto"/> reprezentujcí změněný předmět; pokud id neexistuje <c>null</c>
        /// </returns>

        public ItemDto UpdateItem(int id, ItemDto itemDto)
        {
            if (!_itemRepository.IsExist(id))
            {
                return null;
            }

            Item item = _mapper.Map<Item>(itemDto);
            item.ItemId = id;
            Item updatedItem = _itemRepository.Update(item);
            return _mapper.Map<ItemDto>(updatedItem);
        }

        /// <summary>
        /// Smaže předmět z databáze.
        /// </summary>
        /// <param name="id">Id předmětu co chceme odstranit</param>
        /// <returns>
        /// <see cref="ItemDto"/> odstraněno předmětu; pokud id neexistuje <c>null</c>
        /// </returns>
        public ItemDto? DeleteItem(int id)
        {
            if (!_itemRepository.IsExist(id))
            {
                return null;
            }
            Item item = _itemRepository.GetById(id);
            ItemDto itemDto = _mapper.Map<ItemDto>(item);

            _itemRepository.Delete(id);
            return itemDto;
        }
    }
}
