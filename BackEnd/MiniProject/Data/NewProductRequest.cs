using MiniProject.Models;
using System.ComponentModel.DataAnnotations;

namespace MiniProject.Data
{
    public class NewProductRequest
    {
        [Required]
        public int ProductID { get; set; }

        [Required]
        public string ProductCategory { get; set; }

        [Required]
        public Guid UserID { get; set; }

    }
}
