using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LostAndFoundBack.Models
{
    public class Claim
    {
        [Required]
        public int ClaimId { get; set; }
        public int UserId { get; set; }
        public int ItemId { get; set; }

    }
}
