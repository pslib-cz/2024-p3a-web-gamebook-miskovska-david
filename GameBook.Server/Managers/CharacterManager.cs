using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
namespace GameBook.Server.Managers
{
    public class CharacterManager: ICharacterManager
    {
        /// <summary>
        /// přístup k <see cref="Item"/> entitě v databázi
        /// </summary>
        private readonly IBaseRepository<Character> _characterRepository;
        /// <summary>
        /// Mapper pro mapování (convertovaní) mezi entitami a DTO.
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
        /// Vrátí všechny postavy z databáze a namapuje je na DTO.
        /// </summary>
        /// <returns>
        /// List <see cref="CharacterDto"/> objektů reprezentujcí postavu
        /// </returns>

        public IList<CharacterDto> GetAllCharacters()
        {
            IList<Character> characters = _characterRepository.GetAll();
            return _mapper.Map<IList<CharacterDto>>(characters);
        }

        /// <summary>
        /// Vrátí postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy co chceme vrátit</param>
        /// <returns>
        /// <see cref="CharacterDto"/> objekt pokud id existuje; jinak <c>null</c>
        /// </returns>

        public CharacterDto? GetCharacterById(int id)
        {
            Character? character = _characterRepository.GetById(id);
            if (character == null)
            {
                return null;
            }
            return _mapper.Map<CharacterDto>(character);
        }

        /// <summary>
        /// Vytvoří novou postavu v databázi a uloží obrázek do složky
        /// </summary>
        /// <param name="characterDto">DTO s detailem o postavě co chceme vytvořit</param>
        /// <param name="file">Pozadí (obrázek) pro danou postavu</param>
        /// <returns>
        /// <see cref="CharacterDto"/> objekt pokud se podaří vytvořit; jinak <c>null</c>
        /// </returns>

        public CharacterDto? CreateCharacter(CharacterDto characterDto, IFormFile file)
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
            Character createdCharacter = _characterRepository.Create(character);
            return _mapper.Map<CharacterDto>(createdCharacter);
        }

        /// <summary>
        /// Aktualizuje postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy co chceme změnit</param>
        /// <param name="characterDto">DTO s detailem o postav+, kterou chceme změnit</param>
        /// <returns>
        /// <see cref="CharacterDto"/> objekt reprezentujcí změněnou postavu; pokud id neexistuje <c>null</c>
        /// </returns>

        public CharacterDto UpdateCharacter(int id, CharacterDto characterDto)
        {
            if (!_characterRepository.IsExist(id))
            {
                return null;
            }

            Character character = _mapper.Map<Character>(characterDto);
            character.CharacterId = id;
            Character updatedCharacter = _characterRepository.Update(character);
            return _mapper.Map<CharacterDto>(updatedCharacter);
        }

        /// <summary>
        /// Smaže postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy, kterou chceme smazat</param>
        /// <returns>
        /// <see cref="CharacterDto"/> objekt reprezentujcí smazanou postavu; pokud id neexistuje <c>null</c>"/>
        /// </returns>

        public CharacterDto? DeleteCharacter(int id)
        {
            if (!_characterRepository.IsExist(id))
            {
                return null;
            }
            Character character = _characterRepository.GetById(id);
            CharacterDto characterDto = _mapper.Map<CharacterDto>(character);

            _characterRepository.Delete(id);
            return characterDto;
        }

    }
}
