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
                observation.CoverImage = GetImageDataFromQuery(query.CoverImageData);
            }
            observation.Images = new List<ImageData>();
            foreach (ImageDataQuery imageQuery in query.Images)
            {
                observation.Images.Add(GetImageDataFromQuery(imageQuery));
            }
            return observation;
        }

        public ImageData GetImageDataFromQuery(ImageDataQuery query)
        {
            ImageData image = new ImageData();
            image.Description = query.Description;
            image.ImagePath = query.ImagePath;
            return image;
        }

    }
}
