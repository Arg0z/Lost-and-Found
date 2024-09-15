using LostAndFoundBack.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LostAndFoundBack.Security
{
    // JwtToken class is responsible for generating JWT tokens for users
    public class JwtToken
    {
        private readonly IConfiguration _configuration;

        // Constructor that accepts configuration object for accessing app settings
        public JwtToken(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Method to generate a JWT token for a user
        public string GenerateJwtToken(User user)
        {
            // Define the claims for the token, including user ID and a unique identifier (JTI)
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id), // User ID claim
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // Unique token identifier
            };

            // Create a symmetric security key from the Jwt:Key stored in configuration settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            // Signing credentials using the security key and HmacSha256 algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the JWT token with claims, expiry time, and signing credentials
            var token = new JwtSecurityToken(
                claims: claims, // Include claims
                expires: DateTime.Now.AddMinutes(30), // Set token expiry (30 minutes)
                signingCredentials: creds); // Set signing credentials

            // Return the JWT token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
