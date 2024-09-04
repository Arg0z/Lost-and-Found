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

        public DbSet<Item> Items { get; set; }
        public DbSet<Claim> Claims { get; set; }
        public DbSet<ReportedItem> ReportedItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasKey(i => i.item_id);
            base.OnModelCreating(modelBuilder);
        }
    }
}
