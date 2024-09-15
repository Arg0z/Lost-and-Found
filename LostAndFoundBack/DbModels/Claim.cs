using LostAndFoundBack.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LostAndFoundBack.DbModels
{
    // Represents a claim in the Lost and Found system
    public class Claim
    {
        // Primary key for the Claim entity
        [Key]
        public int ClaimId { get; set; }

        // Foreign key to the associated Item entity
        public int ItemId { get; set; }

        // ID of the user who made the claim (usually from the authentication system)
        public string UserId { get; set; }

        // Description provided by the user about the claim
        public string description { get; set; }

        // Date when the item was found
        public DateTime date_found { get; set; }

        // Location where the item was found
        public string location_found { get; set; }

        // Category of the found item (e.g., Electronics, Clothing)
        public string category { get; set; }

        // Status of the claim (e.g., Pending, Approved, Rejected) from the ClaimStatuses enum
        public ClaimStatuses Status { get; set; }
    }
}
