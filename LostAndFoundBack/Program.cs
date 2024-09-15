using LostAndFoundBack.DataBase;
using LostAndFoundBack.Models;
using LostAndFoundBack.Repositories.Interfaces;
using LostAndFoundBack.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add controllers to the service collection
builder.Services.AddControllers();

// Enable API explorer for Swagger generation
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger for API documentation and authentication
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "LostAndFound API", Version = "v1" });

    // Add JWT Bearer token authorization scheme to Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
    });

    // Add security requirement to use the Bearer scheme
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Add authorization service
builder.Services.AddAuthorization();

// Add JWT authentication service
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        // Configure token validation parameters
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false, // Do not validate issuer
            ValidateAudience = false, // Do not validate audience
            ValidateLifetime = true, // Validate token expiration
            ValidateIssuerSigningKey = true, // Validate the signing key
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])) // Get signing key from configuration
        };
    });

// Configure Identity service with User and Role models
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true; // Require unique email addresses for users
})
    .AddEntityFrameworkStores<ApplicationDbContext>() // Store identity data in database using Entity Framework
    .AddDefaultTokenProviders(); // Use default token providers for user verification

// Configure Entity Framework with SQL Server and retry policies for connection failures
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
    sqlServerOptionsAction: sqlOptions =>
    {
        // Retry on failure for database connections
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5, // Maximum number of retries
            maxRetryDelay: TimeSpan.FromSeconds(30), // Delay between retries
            errorNumbersToAdd: null); // No additional error numbers
    }));

// Configure CORS policy to allow frontend app origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendApp",
        policy => policy.WithOrigins("https://frontend.d1s26047wlj6lo.amplifyapp.com", "http://localhost:3000")//depricated, change to yours
                        .AllowAnyMethod() // Allow any HTTP method
                        .AllowAnyHeader() // Allow any HTTP headers
                        .AllowCredentials()); // Allow credentials (cookies, authorization headers)
});

// Register custom repositories and services in the DI container
builder.Services.AddScoped<IItemRepository, ItemRepository>(); // Scoped means a new instance is created per request
builder.Services.AddSingleton<EmailService, EmailService>(); // Singleton means the same instance is used throughout the app's lifetime

var app = builder.Build();

// Configure middleware and services for development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger documentation
    app.UseSwaggerUI(); // Enable Swagger UI for API exploration
}

// Initialize database roles at startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    await DbInitializer.Initialize(roleManager); // Initialize roles in the database
}

// Middleware for HTTPS redirection, CORS, routing, authentication, and authorization
app.UseHttpsRedirection(); // Redirect HTTP requests to HTTPS
app.UseCors("AllowFrontendApp"); // Apply the configured CORS policy
app.UseRouting(); // Enable routing
app.UseAuthentication(); // Enable JWT authentication middleware
app.UseAuthorization(); // Enable authorization middleware

// Map controller routes to endpoints
app.MapControllers();

app.Run(); // Run the application
