using LostAndFoundBack.Models;
using LostAndFoundBack.Repositories;
using LostAndFoundBack.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IItemRepository, ItemRepository>();

// Correct place to configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendApp",
        policy => policy.WithOrigins("http://localhost:3000") // React's URL
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontendApp"); // Ensure CORS is used before UseRouting/UseAuthentication/UseAuthorization
app.UseAuthorization();

app.MapControllers();
app.Run();
