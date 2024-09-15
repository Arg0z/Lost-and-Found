using LostAndFoundBack.DbModels;
using LostAndFoundBack.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LostAndFoundBack.DataBase
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet for Items
        public DbSet<Item> Items { get; set; }

        // DbSet for Claims
        public DbSet<Claim> Claims { get; set; }

        // DbSet for Reported Items
        public DbSet<ReportedItem> ReportedItems { get; set; }

        // Custom configuration for Item entity
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasKey(i => i.item_id);
            base.OnModelCreating(modelBuilder);
        }
    }
}
