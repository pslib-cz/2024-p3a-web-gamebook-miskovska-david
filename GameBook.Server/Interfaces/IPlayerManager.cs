using GameBook.Server.Models;

namespace GameBook.Server.Interfaces
{
    public interface IPlayerManager
    {
        Task<IList<Player>> GetAllPlayers();
        Task<Player?> GetPlayerById(int id);
        Task<Player?> CreatePlayer(Player playerDto);
        Task<Player> UpdatePlayer(int id, Player playerDto);
        Task<Player?> DeletePlayer(int id);
    }
}
