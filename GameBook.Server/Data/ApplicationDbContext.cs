using Microsoft.EntityFrameworkCore;
using GameBook.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace GameBook.Server.Data
{
    public class ApplicationDbContext: IdentityDbContext<IdentityUser>
    {
        

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Character> Characters { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Location> Locations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }


    }
}
