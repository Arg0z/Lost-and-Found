using LostAndFoundBack.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LostAndFoundBack.DbModels
{
    public class Claim
    {
        [Required]
        public int ClaimId { get; set; }
        public string UserId { get; set; }
        public int ItemId { get; set; }
        public ClaimStatuses Status { get; set; }

    }
}
