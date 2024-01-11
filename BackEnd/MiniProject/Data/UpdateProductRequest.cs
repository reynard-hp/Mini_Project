using System.ComponentModel.DataAnnotations;

namespace MiniProject.Data
{
    public class UpdateProductRequest
    {
        [Required]
        public string ProductCategory { get; set;  }
    }
}
