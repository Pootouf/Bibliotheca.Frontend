namespace Bibliotheca.Models
{
    public class Observation
    {
        public Guid Id { get; set; }

        public ImageData? CoverImage { get; set; }

        public IEnumerable<ImageData> Images { get; set; } = [];

        public DateTime? ObservationDate { get; set; }

        public DateTime? PostedDate { get; set; }

        public string? Description { get; set; }
    }
}
