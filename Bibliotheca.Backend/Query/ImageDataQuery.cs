using System.ComponentModel.DataAnnotations;

namespace Bibliotheca.Backend.Query
{
    public class ImageDataQuery
    {

        public string? Description { get; set; }

        [Required]
        public string? ImagePath { get; set; }

    }
}
