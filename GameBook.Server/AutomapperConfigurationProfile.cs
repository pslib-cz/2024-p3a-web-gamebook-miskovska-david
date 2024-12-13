using AutoMapper;
using GameBook.Server.Models;

namespace GameBook.Server
{
    public class AutomapperConfigurationProfile: Profile
    {
        public AutomapperConfigurationProfile()
        {
            CreateMap<Room, RoomDto>();
            CreateMap<RoomDto, Room>();
        }
    }
}
