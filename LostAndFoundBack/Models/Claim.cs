using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LostAndFoundBack.Models
{
    public class Claim
    {
        [Required]
        public int ClaimId { get; set; }
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        [ForeignKey(nameof(ItemId))]
        public int ItemId { get; set; }

    }
}
