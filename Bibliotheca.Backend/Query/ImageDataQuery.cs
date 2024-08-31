using System.ComponentModel.DataAnnotations;

namespace Bibliotheca.Backend.Query
{
    public class ImageDataQuery
    {
        [Required]
        public string? ImagePath { get; set; }

        public string? Description { get; set; }

        [Required]
        public IFormFile? Image { get; set; }
    }
}
