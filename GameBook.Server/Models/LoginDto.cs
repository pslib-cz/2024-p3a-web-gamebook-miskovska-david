namespace GameBook.Server.Models
{
    public class LoginDto
    {
        public required string Email { get; set; }
        public string? UserName { get; set; }
        public required string Password { get; set; }
    }
}
