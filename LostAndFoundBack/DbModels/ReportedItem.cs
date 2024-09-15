using LostAndFoundBack.Constants;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LostAndFoundBack.DbModels
{
    public class ReportedItem
    {
        // Primary key for the reported item
        [Key]
        [Column("item_id")]
        public int item_id { get; set; }

        // ID of the user who reported the item
        [Column("user_id")]
        public string UserId { get; set; }

        // Description of the reported item
        [Column("description")]
        public string description { get; set; }

        // Date when the item was found
        [Column("date_found")]
        public DateTime date_found { get; set; }

        // Location where the item was found
        [Column("location_found")]
        public string location_found { get; set; }

        // Category of the item (e.g., electronics, clothing)
        [Column("category")]
        public string category { get; set; }

        // Status of the reported item (optional)
        [Column("item_status")]
        public ReportedItemStatuses? Status { get; set; }
    }
}
