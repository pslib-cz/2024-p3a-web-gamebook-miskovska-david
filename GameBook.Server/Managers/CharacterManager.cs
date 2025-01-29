using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
namespace GameBook.Server.Managers
{
    public class CharacterManager: ICharacterManager
    {
        /// <summary>
        /// přístup k <see cref="CharacterManager"/> entitě v databázi
        /// </summary>
        private readonly IBaseRepository<Character> _characterRepository;
        /// <summary>
        /// Mapper pro mapování (convertovaní) mezi entitami.
        /// </summary>
        private readonly IMapper _mapper;
        /// <summary>
        /// Cesta ke složce, kde se ukládají obrázky.
        /// </summary>
        private const string _folder = "wwwroot/uploads/";
        public CharacterManager(IBaseRepository<Character> characterRepository, IMapper mapper)
        {
            _characterRepository = characterRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Vrátí všechny postavy z databáze a namapuje je.
        /// </summary>
        /// <returns>
        /// List <see cref="Character"/> objektů reprezentujcí postavu
        /// </returns>

        public async Task<IList<Character>> GetAllCharacters()
        {
            IList<Character> characters = await _characterRepository.GetAll();
            return _mapper.Map<IList<Character>>(characters);
        }

        /// <summary>
        /// Vrátí postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy co chceme vrátit</param>
        /// <returns>
        /// <see cref="CharacterDto"/> objekt pokud id existuje; jinak <c>null</c>
        /// </returns>

        public async Task<Character>? GetCharacterById(int id)
        {
            Character? character =  await _characterRepository.GetById(id);
            if (character == null)
            {
                return null;
            }
            return _mapper.Map<Character>(character);
        }

        /// <summary>
        /// Vytvoří novou postavu v databázi a uloží obrázek do složky
        /// </summary>
        /// <param name="Character">Třida s detailem o postavě co chceme vytvořit</param>
        /// <param name="file">Pozadí (obrázek) pro danou postavu</param>
        /// <returns>
        /// <see cref="Character"/> objekt pokud se podaří vytvořit; jinak <c>null</c>
        /// </returns>

        public async Task<Character?> CreateCharacter(Character characterDto, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }
            var path = Path.Combine(_folder, file.FileName.ToLower());

            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            Character character = _mapper.Map<Character>(characterDto);
            character.CharImg = path.ToString().ToLower().Replace("wwwroot/", "");
            Character createdCharacter = await _characterRepository.Create(character);
            return _mapper.Map<Character>(createdCharacter);
        }

        /// <summary>
        /// Aktualizuje postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy co chceme změnit</param>
        /// <param name="characterDto">DTO s detailem o postav+, kterou chceme změnit</param>
        /// <returns>
        /// <see cref="CharacterDto"/> objekt reprezentujcí změněnou postavu; pokud id neexistuje <c>null</c>
        /// </returns>

        public async Task<Character> UpdateCharacter(int id, Character characterDto)
        {
            if (!await _characterRepository.IsExist(id))
            {
                return null;
            }

            Character character = _mapper.Map<Character>(characterDto);
            character.CharacterId = id;
            Character updatedCharacter = await _characterRepository.Update(character);
            return _mapper.Map<Character>(updatedCharacter);
        }

        /// <summary>
        /// Smaže postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy, kterou chceme smazat</param>
        /// <returns>
        /// <see cref="Character"/> objekt reprezentujcí smazanou postavu; pokud id neexistuje <c>null</c>"/>
        /// </returns>

        public async Task<Character?> DeleteCharacter(int id)
        {
            if (! await _characterRepository.IsExist(id))
            {
                return null;
            }
            Character character = await _characterRepository.GetById(id);
            Character characterDto = _mapper.Map<Character>(character);

            _characterRepository.Delete(id);
            return characterDto;
        }

    }
}
