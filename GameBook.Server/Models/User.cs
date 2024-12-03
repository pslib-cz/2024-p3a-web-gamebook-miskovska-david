namespace GameBook.Server.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }

        //cizí klíč
        public Room? Room { get; set; }
        public int RoomId { get; set; }
    }
}
