namespace GameBook.Server.Models
{
    public class UserDto
    {
        public Guid UserId { get; set; }
        public required string Email { get; set; }
        public required string UserName { get; set; }
    }
}
