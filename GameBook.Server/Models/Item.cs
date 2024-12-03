﻿namespace GameBook.Server.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Img { get; set; }
        public required int Price { get; set; }
        public int? Damage { get; set; }
        public int? Defence { get; set; }
    }
}
