namespace GameBook.Server.Models
{
    public class Player
    {
        public Guid PlayerId { get; set; }
        public int Coin { get; set; }
        public int Damage { get; set; }
        public int Defence { get; set; }
        public int hp { get; set; } = 100;

        //cizí klíč
        public User? User { get; set; }
        public Guid UserId { get; set; }
    }
}
