using LostAndFoundBack.DataBase;
using LostAndFoundBack.Models;
using LostAndFoundBack.Repositories.Interfaces;
using LostAndFoundBack.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication()
    .AddCookie()
    .AddBearerToken(IdentityConstants.BearerScheme); // Specify the authentication scheme and add Cookie authentication

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders()
    .AddApiEndpoints();

// Configure DbContext with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IItemRepository, ItemRepository>();

// Correct place to configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendApp",
        policy => policy.WithOrigins("https://frontend.d1s26047wlj6lo.amplifyapp.com/ ") // React's URL
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()); // Allow credentials for cookie authentication
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<User>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    //await DbInitializer.Initialize(userManager, roleManager); // Initialize roles and users
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapIdentityApi<User>();
app.UseHttpsRedirection();
app.UseCors("AllowFrontendApp"); // Ensure CORS is used before UseRouting/UseAuthentication/UseAuthorization
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
