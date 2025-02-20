namespace GameBook.Server.Models
{
    public class Character
    {
        public int CharacterId { get; set; }
        public required string Name { get; set; }
        public required string Bio { get; set; }
        public required string CharImg { get; set; }
        public required int Hp { get; set; }
        public required int Attack { get; set; }
    }
}
