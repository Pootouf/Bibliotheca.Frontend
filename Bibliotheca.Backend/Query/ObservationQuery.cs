using Bibliotheca.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Bibliotheca.Backend.Query
{
    public class ObservationQuery
    {
        [Required]
        public ImageDataQuery? CoverImageData { get; set; }

        [Required]
        public DateTime? ObservationDate { get; set; }

        [Required]
        public DateTime? PostedDate { get; set; }

        public string? Description { get; set; }
    }
}
