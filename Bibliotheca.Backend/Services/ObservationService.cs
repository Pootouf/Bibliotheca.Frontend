using Bibliotheca.Backend.Query;
using Bibliotheca.Models;

namespace Bibliotheca.Backend.Services
{
    public class ObservationService : IObservationService
    {

        public AnimalObservation GetAnimalObservationFromQuery(AnimalObservationQuery query)
        {
            AnimalObservation observation = new AnimalObservation();
            observation.ObservationDate = query.ObservationDate;
            observation.PostedDate = query.PostedDate;
            observation.Description = query.Description;

            observation.Kingdom = query.Kingdom;
            observation.Phylum = query.Phylum;
            observation.Class = query.Class;
            observation.Order = query.Order;
            observation.Family = query.Family;
            observation.Tribe = query.Tribe;
            observation.Genus = query.Genus;
            observation.Species = query.Species;
            observation.VernacularName = query.VernacularName;

            if (query.CoverImageData != null)
            {
                ImageData cover = new ImageData();
                cover.Description = query.CoverImageData.Description;
                cover.ImagePath = query.CoverImageData.ImagePath;
                observation.CoverImage = cover;
            }
            observation.Images = new List<ImageData>();
            foreach (ImageDataQuery imageQuery in query.ImagesData)
            {
                ImageData image = new ImageData();
                image.Description = imageQuery.Description;
                image.ImagePath = imageQuery.ImagePath;
                observation.Images.Prepend(image);
            }
            return observation;
        }

    }
}
