namespace GameBook.Server.Models
{
    public class Player
    {
        public Guid PlayerId { get; set; }
        public int Coin { get; set; }
        public int Damage { get; set; }
        public int Defence { get; set; }

        //cizí klíč
        public User? User { get; set; }
        public Guid UserId { get; set; }
    }
}
