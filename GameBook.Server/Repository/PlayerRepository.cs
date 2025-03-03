using GameBook.Server.Models;
using GameBook.Server.Interfaces;
using GameBook.Server.Data;
using Microsoft.EntityFrameworkCore;
namespace GameBook.Server.Repository
{
    public class PlayerRepository : BaseRepository<Player>, IPlayerRepository
    {
        public PlayerRepository(ApplicationDbContext context) : base(context)
        {
        }


        public async Task<Player?> GetPlayerByUserId(string userId)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.Id == userId);
        }

    }
    
}
