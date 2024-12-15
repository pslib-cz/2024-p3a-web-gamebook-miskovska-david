using AutoMapper;
using GameBook.Server.Models;

namespace GameBook.Server
{
    public class AutomapperConfigurationProfile: Profile
    {
        public AutomapperConfigurationProfile()
        {

            //Konfigurace mapování mezi entitami a DTO Room
            CreateMap<Room, RoomDto>();
            CreateMap<RoomDto, Room>();

            //Konfigurace mapování mezi entitami a DTO Item
            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>();
        }
    }
}
