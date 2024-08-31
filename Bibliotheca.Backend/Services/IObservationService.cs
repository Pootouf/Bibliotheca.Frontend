using Bibliotheca.Backend.Query;
using Bibliotheca.Models;

namespace Bibliotheca.Backend.Services
{
    public interface IObservationService
    {

        public AnimalObservation GetAnimalObservationFromQuery(AnimalObservationQuery query);

    }
}
