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

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders()
    .AddApiEndpoints();

// Configure DbContext with SQL Server and enable retry on failure
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
    sqlServerOptionsAction: sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    }));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendApp",
        policy => policy.WithOrigins("https://frontend.d1s26047wlj6lo.amplifyapp.com")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
});

builder.Services.AddScoped<IItemRepository, ItemRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    await DbInitializer.Initialize(roleManager); // Initialize roles only
}

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseCors("AllowFrontendApp"); // Ensure CORS is used before UseRouting/UseAuthentication/UseAuthorization
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapIdentityApi<User>();

app.Run();
