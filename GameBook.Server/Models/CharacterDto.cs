namespace GameBook.Server.Models
{
    public class CharacterDto
    {
        public int CharacterId { get; set; }
        public required string Name { get; set; }
        public required string Bio { get; set; }
        public required string CharImg { get; set; }
        public required int hp { get; set; }
    }
}
