using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LostAndFoundBack.Constants;

namespace LostAndFoundBack.DbModels
{
    public class Item
    {
        // Primary key for the Item entity
        [Key]
        [Column("item_id")]
        public int item_id { get; set; }

        // Description of the found item
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

        // URL of the photo for the item
        [Column("photo_url")]
        public string photo_url { get; set; }

        // Status of the item (optional)
        [Column("item_status")]
        public ItemStatuses? Status { get; set; }
    }
}
