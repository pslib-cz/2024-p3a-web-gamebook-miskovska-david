using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;

namespace GameBook.Server.Managers
{
    public class ItemManager : IItemManager
    {
        private readonly  IItemRepository _itemRepository;
        private readonly IMapper _mapper;
        public ItemManager(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public IList<ItemDto> GetAllItems()
        {
            IList<Item> items = _itemRepository.GetAll();
            return _mapper.Map<IList<ItemDto>>(items);
        }

        public async Task<ItemDto> Upload(IFormFile file)
        {
            await _itemRepository.Upload(file);
            
            Item item = _itemRepository.GetAll().Last();
            return _mapper.Map<ItemDto>(item);
        }
    }
}
