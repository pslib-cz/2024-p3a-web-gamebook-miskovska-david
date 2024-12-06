namespace GameBook.Server.Models
{
    public class ItemDto
    {
        public int ItemId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Img { get; set; }
        public int Price { get; set; }
        public int Damage { get; set; }
        public int Defence { get; set; }
    }
}
