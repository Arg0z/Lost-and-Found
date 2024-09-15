using System.ComponentModel.DataAnnotations;

namespace LostAndFoundBack.Models
{
    // LoginModel class used for capturing login credentials (email and password)
    public class LoginModel
    {
        // Email property with validation to ensure it's provided and a valid email format
        [Required(ErrorMessage = "Email is required")] // Field is required
        [EmailAddress(ErrorMessage = "Invalid Email Address")] // Must be a valid email format
        public string Email { get; set; }

        // Password property with validation to ensure it's provided and treated as a password type
        [Required(ErrorMessage = "Password is required")] // Field is required
        [DataType(DataType.Password)] // Ensures that this field is treated as a password (e.g., for hiding input)
        public string Password { get; set; }
    }
}
