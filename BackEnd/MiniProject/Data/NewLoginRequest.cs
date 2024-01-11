using System.ComponentModel.DataAnnotations;

namespace MiniProject.Data
{
    public class NewLoginRequest
    {
        [Required]
        public string UserEmail { get; set;}
        [Required]
        public string UserPassword { get; set;}

    }
}
