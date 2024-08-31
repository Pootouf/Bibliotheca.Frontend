using System.ComponentModel.DataAnnotations;

namespace Bibliotheca.Backend.Query
{
    public class ImageDataAddToObservationQuery : ImageDataQuery
    {

        [Required]
        public Guid? ParentId { get; set; }

    }
}
