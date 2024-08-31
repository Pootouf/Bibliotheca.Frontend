using System.ComponentModel.DataAnnotations.Schema;

namespace Bibliotheca.Models
{
    public class ImageData
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string? ImagePath { get; set; }

        public string? Description { get; set; }
    }
}
