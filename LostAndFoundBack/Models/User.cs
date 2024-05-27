using System.ComponentModel.DataAnnotations;

namespace LostAndFoundBack.Models
{
    public class User
    {
        [Required]
        public int UserId { get; set; }
        public string UserName {  get; set; }
        public string Email { get; set; }

        public ICollection<Claim> Claims { get; set; }
    }
}
