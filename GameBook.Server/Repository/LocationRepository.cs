using GameBook.Server.Data;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
namespace GameBook.Server.Repository
{
    public class LocationRepository: BaseRepository<Location>, ILocationRepository
    {
    public LocationRepository(ApplicationDbContext context) : base(context)
    {
    }
}
}   


