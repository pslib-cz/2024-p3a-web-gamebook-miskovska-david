using AutoMapper;
using GameBook.Server.Interfaces;
using GameBook.Server.Models;
namespace GameBook.Server.Managers
{
    public class PlayerManager : IPlayerManager
    {
        
        private readonly IBaseRepository<Player> _playerRepository;
        
        private readonly IMapper _mapper;
        
        public PlayerManager(IBaseRepository<Player> playerRepository, IMapper mapper)
        {
            _playerRepository = playerRepository;
            _mapper = mapper;
        }

        

        public async Task<IList<Player>> GetAllPlayers()
        {
            IList<Player> players = await _playerRepository.GetAll();
            return _mapper.Map<IList<Player>>(players);
        }

        

        public async Task<Player>? GetPlayerById(int id)
        {
            Player? player = await _playerRepository.GetById(id);
            if (player == null)
            {
                return null;
            }
            return _mapper.Map<Player>(player);
        }

        

        public async Task<Player?> CreatePlayer(Player playerDto)
        {


            Player player = _mapper.Map<Player>(playerDto);
            Player createdPlayer = await _playerRepository.Create(player);
            return _mapper.Map<Player>(createdPlayer);
        }

        

        public async Task<Player> UpdatePlayer(int id, Player playerDto)
        {
            if (!await _playerRepository.IsExist(id))
            {
                return null;
            }

            Player player = _mapper.Map<Player>(playerDto);
            player.PlayerId = id;
            Player updatedPlayer = await _playerRepository.Update(player);
            return _mapper.Map<Player>(updatedPlayer);
        }

       

        public async Task<Player?> DeletePlayer(int id)
        {
            if (!await _playerRepository.IsExist(id))
            {
                return null;
            }
            Player player = await _playerRepository.GetById(id);
            Player playerDto = _mapper.Map<Player>(player);

            _playerRepository.Delete(id);
            return playerDto;
        }
    }
}
