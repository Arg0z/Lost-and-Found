using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LostAndFoundBack.Models
{
    public class Item
    {
        [Key]
        [Column("item_id")]
        public int item_id { get; set; }

        [Column("description")]
        public string description { get; set; }

        [Column("date_found")]
        public DateTime date_found { get; set; }

        [Column("location_found")]
        public string location_found { get; set; }

        [Column("category")]
        public string category { get; set; }

        [Column("photo_url")]
        public string photo_url { get; set; }

        [Column("item_status")]
        public Status? Status { get; set; }
    }
}
