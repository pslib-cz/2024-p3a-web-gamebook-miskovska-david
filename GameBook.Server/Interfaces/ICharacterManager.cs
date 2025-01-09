using GameBook.Server.Models;

namespace GameBook.Server.Interfaces
{
    public interface ICharacterManager
    {
        IList<CharacterDto> GetAllCharacters();
        CharacterDto? GetCharacterById(int id);
        CharacterDto? CreateCharacter(CharacterDto characterDto, IFormFile file);
        CharacterDto UpdateCharacter(int id, CharacterDto characterDto);
        CharacterDto? DeleteCharacter(int id);
    }
}
