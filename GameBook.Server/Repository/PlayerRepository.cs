﻿using GameBook.Server.Models;
using GameBook.Server.Interfaces;
using GameBook.Server.Data;
namespace GameBook.Server.Repository
{
    public class PlayerRepository : BaseRepository<Player>, IPlayerRepository
    {
        public PlayerRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
    
}
