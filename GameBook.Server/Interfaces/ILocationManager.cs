using GameBook.Server.Models;

namespace GameBook.Server.Interfaces
{
    public interface ILocationManager
    {
        Task<IList<Location>> GetAllLocations();
        Task<Location?> GetLocationById(int id);
        Task<Location?> CreateLocation(Location location, IFormFile file);
        Task<Location> UpdateLocation(int id, Location location);
        Task<Location?> DeleteLocation(int id);
    }
}
