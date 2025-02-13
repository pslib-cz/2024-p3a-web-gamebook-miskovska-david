using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;

namespace GameBook.Server.Managers
{
    public class LocationManager: ILocationManager
    {

        /// <summary>
        /// přístup k <see cref="LocationManager"/> entitě v databázi
        /// </summary>
        private readonly IBaseRepository<Location> _locationRepository;
        /// <summary>
        /// Mapper pro mapování (convertovaní) mezi entitami.
        /// </summary>
        private readonly IMapper _mapper;
        /// <summary>
        /// Cesta ke složce, kde se ukládají obrázky.
        /// </summary>
        private const string _folder = "wwwroot/uploads/";
        public LocationManager(IBaseRepository<Location> locationRepository, IMapper mapper)
        {
            _locationRepository = locationRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Vrátí všechny lokace z databáze a namapuje je.
        /// </summary>
        /// <returns>
        /// List <see cref="Location"/> objektů reprezentujcí postavu
        /// </returns>

        public async Task<IList<Location>> GetAllLocations()
        {
            IList<Location> locations = await _locationRepository.GetAll();
            return _mapper.Map<IList<Location>>(locations);
        }

        /// <summary>
        /// Vrátí postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id lokace co chceme vrátit</param>
        /// <returns>
        /// <see cref="CharacterDto"/> objekt pokud id existuje; jinak <c>null</c>
        /// </returns>

        public async Task<Location>? GetLocationById(int id)
        {
            Location? location = await _locationRepository.GetById(id);
            if (location == null)
            {
                return null;
            }
            return _mapper.Map<Location>(location);
        }

        /// <summary>
        /// Vytvoří novou postavu v databázi a uloží obrázek do složky
        /// </summary>
        /// <param name="Location">Třida s detailem o lokaci co chceme vytvořit</param>
        /// <param name="file">Pozadí (obrázek) pro danou postavu</param>
        /// <returns>
        /// <see cref="Location"/> objekt pokud se podaří vytvořit; jinak <c>null</c>
        /// </returns>

        public async Task<Location?> CreateLocation(Location locationDto, IFormFile file)
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
            Location location = _mapper.Map<Location>(locationDto);
            location.locationImg = path.ToString().ToLower().Replace("wwwroot/", "");
            Location createdLocation = await _locationRepository.Create(location);
            return _mapper.Map<Location>(createdLocation);
        }

        /// <summary>
        /// Aktualizuje postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy co chceme změnit</param>
        /// <param name="Location">DTO s detailem o postav+, kterou chceme změnit</param>
        /// <returns>
        /// <see cref="Location"/> objekt reprezentujcí změněnou postavu; pokud id neexistuje <c>null</c>
        /// </returns>

        public async Task<Location> UpdateLocation(int id, Location location)
        {
            if (!await _locationRepository.IsExist(id))
            {
                return null;
            }

            Location newLocation = _mapper.Map<Location>(location);
            newLocation.LocationId = id;
            Location updatedLocation = await _locationRepository.Update(location);
            return _mapper.Map<Location>(updatedLocation);
        }

        /// <summary>
        /// Smaže postavu podle zadaného Id.
        /// </summary>
        /// <param name="id">Id postavy, kterou chceme smazat</param>
        /// <returns>
        /// <see cref="Location"/> objekt reprezentujcí smazanou postavu; pokud id neexistuje <c>null</c>"/>
        /// </returns>

        public async Task<Location?> DeleteLocation(int id)
        {
            if (!await _locationRepository.IsExist(id))
            {
                return null;
            }
            Location location = await _locationRepository.GetById(id);
            _locationRepository.Delete(id);
            return location;
        }

    }
}
