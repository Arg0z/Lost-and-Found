using System.ComponentModel.DataAnnotations;

namespace LostAndFoundBack.Models
{
    // RegisterModel class used for capturing user registration details
    public class RegisterModel
    {
        // Name property with validation to ensure it's provided
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        // Email property with validation to ensure it's provided and a valid email format
        [Required(ErrorMessage = "Email is required.")] // Field is required
        [EmailAddress(ErrorMessage = "Invalid email address.")] // Must be a valid email format
        public string Email { get; set; }

        // Password property with validation to ensure it's provided, has minimum length, and meets complexity requirements
        [Required(ErrorMessage = "Password is required")] // Field is required
        [DataType(DataType.Password)] // Ensures that this field is treated as a password (e.g., for hiding input)
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")] // Length validation
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$",
            ErrorMessage = "Password must have at least one uppercase letter, one lowercase letter, and one digit.")] // Ensures password complexity
        public string Password { get; set; }
    }
}
