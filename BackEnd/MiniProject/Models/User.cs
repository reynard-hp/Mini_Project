using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Http.Headers;

namespace MiniProject.Models
{
    [Table("MsUser")]
    public class User
    {
        [Key]
        public Guid UserID { get; set; }

        [MaxLength(255)]
        public string UserName { get; set; }

        [MaxLength (255)]
        public string UserEmail { get; set; }

        [MaxLength(255)]
        public string UserPassword { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
