﻿namespace GameBook.Server.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Background { get; set; }
        public int? Price { get; set; }
        public int? Damage { get; set; }
        public int? Defence { get; set; }
        public required string Type { get; set; }
    }

    public enum ItemType
    {
        Weapon,
        Potions,
        Special
    }
}
