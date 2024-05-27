using System.ComponentModel.DataAnnotations;

namespace LostAndFoundBack.Models
{
    public class Item
    {
        [Required]
        public int ItemId {  get; set; }
        public string Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateFound { get; set; }
        public string LocationFound { get; set; }
        public string Category { get; set; }
        public string PhotoUrl { get; set; }
        public string Title { get; set; }

        public ICollection<Claim> Claims { get; set; }
    }
}
