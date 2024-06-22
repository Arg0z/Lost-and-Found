using LostAndFoundBack.Constants;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LostAndFoundBack.DbModels
{
    public class ReportedItem
    {
        [Key]
        [Column("item_id")]
        public int item_id { get; set; }
        [Column("user_id")]
        public string UserId { get; set; }

        [Column("description")]
        public string description { get; set; }

        [Column("date_found")]
        public DateTime date_found { get; set; }

        [Column("location_found")]
        public string location_found { get; set; }

        [Column("category")]
        public string category { get; set; }

        [Column("item_status")]
        public ReportedItemStatuses? Status { get; set; }
    }
}
