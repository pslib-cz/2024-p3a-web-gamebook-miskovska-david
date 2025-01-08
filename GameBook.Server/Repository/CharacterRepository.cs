using GameBook.Server.Models; 
using GameBook.Server.Interfaces;
using GameBook.Server.Data;
namespace GameBook.Server.Repository
{
    public class CharacterRepository : BaseRepository<Character>, ICharacterRepository
    {
        public CharacterRepository(ApplicationDbContext context): base(context)
        {
            
        }

    }
}
