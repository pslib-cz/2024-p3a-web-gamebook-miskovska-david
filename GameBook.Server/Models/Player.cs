using GameBook.Server.Migrations;
using Microsoft.AspNetCore.Identity;

namespace GameBook.Server.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public int Coin { get; set; } = 10;
        public int Damage { get; set; } = 10;
        public int Defence { get; set; } = 10;
        public int hp { get; set; } = 100;

        //cizí klíč
        public IdentityUser? User { get; set; }
        public string Id { get; set; }
    }
}
