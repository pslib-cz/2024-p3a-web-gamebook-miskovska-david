﻿using GameBook.Server.Models;

namespace GameBook.Server.Interfaces
{
    public interface IPlayerRepository : IBaseRepository<Player>
    {
        Task<Player?> GetPlayerByUserId(string userId);
    }


}
