namespace GameBook.Server.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        public required string Background { get; set; }
        public IList<string>? Dialogs { get; set; }
        public string? SpecialItem { get; set; }
        public required string roomType { get; set; }
        public bool? IsLocked { get; set; }

        //cizí klíč
        public Character? Character { get; set; }
        public int? CharacterId { get; set; }
    }
}
