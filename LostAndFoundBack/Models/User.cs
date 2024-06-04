using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace LostAndFoundBack.Models
{
    public class User : IdentityUser
    {
        [Required]
        public int UserId { get; set; }
        public string UserName {  get; set; }
        public string Email { get; set; }
    }
}
