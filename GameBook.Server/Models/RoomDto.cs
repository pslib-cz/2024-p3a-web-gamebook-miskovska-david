namespace GameBook.Server.Models
{
    public class RoomDto
    {
        public int RoomId { get; set; }
        public required string Background { get; set; }
        public IList<string>? Dialogs { get; set; }
        public string? SpecialItem { get; set; }
        public required string roomType { get; set; }
        public bool? IsLocked { get; set; }
        public string? LocationName { get; set; }
        public string? Location { get; set; }
        public string? LocationDescription { get; set; }

    }
}
