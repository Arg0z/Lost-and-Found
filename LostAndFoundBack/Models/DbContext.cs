namespace LostAndFoundBack.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Item> Items { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Claim> Claims { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>().HasKey(i => i.item_id); 
        base.OnModelCreating(modelBuilder);
    }

}
