using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MiniProject.Models
{
    [Table("MsProduct")]
    public class Product
    {
        [Key]
        public int ProductID { get; set; }

        [MaxLength(255)]
        public string ProductCategory { get; set; }

        public Guid UserID { get; set; }

    }
}
