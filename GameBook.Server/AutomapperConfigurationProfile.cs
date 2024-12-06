using AutoMapper;
using GameBook.Server.Models;

namespace GameBook.Server
{
    public class AutomapperConfigurationProfile: Profile
    {
        public AutomapperConfigurationProfile()
        {
            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>();
        }
    }
}
