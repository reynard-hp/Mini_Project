using MiniProject.Models;
using System.ComponentModel.DataAnnotations;

namespace MiniProject.Data
{
    public class NewUserRequest
    {
        [Required]
        public Guid UserID { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string UserEmail { get; set; }

        [Required]
        public string UserPassword { get; set; }
    }
}
