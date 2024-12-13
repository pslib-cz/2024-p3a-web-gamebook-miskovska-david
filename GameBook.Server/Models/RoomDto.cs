namespace GameBook.Server.Models
{
    public class RoomDto
    {
        public int RoomId { get; set; }
        public required string Background { get; set; }
        public IList<string>? Dialogs { get; set; }
        public string? SpecialItem { get; set; }

    }
}
