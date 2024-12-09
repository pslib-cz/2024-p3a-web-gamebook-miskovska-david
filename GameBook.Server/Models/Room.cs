namespace GameBook.Server.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        public required string Background { get; set; }
        public ICollection<string>? Dialogs { get; set; }

        //cizí klíč
        public Character? Character { get; set; }
        public int CharacterId { get; set; }
    }
}
