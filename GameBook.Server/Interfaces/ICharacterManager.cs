using GameBook.Server.Models;

namespace GameBook.Server.Interfaces
{
    public interface ICharacterManager
    {
        Task<IList<Character>> GetAllCharacters();
        Task<Character?> GetCharacterById(int id);
        Task<Character?> CreateCharacter(Character characterDto, IFormFile file);
        Task<Character> UpdateCharacter(int id, Character characterDto);
        Task<Character?> DeleteCharacter(int id);
    }
}
