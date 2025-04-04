﻿namespace GameBook.Server.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        public required string Background { get; set; }
        public IList<string>? Dialogs { get; set; }
        public string? SpecialItem { get; set; }
        public bool? IsLocked { get; set; }
        public required string RoomType { get; set; }
        public string? Route { get; set; }


        //cizí klíč
        public Location? location { get; set; }
        public int? locationId { get; set; }
        public Character? Character { get; set; }
        public int? CharacterId { get; set; }
    }


}
