import { Injectable } from '@angular/core';
import { TaxonData } from './shared/taxon-data';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private apiUrl: string = environment.apiSpeciesURL;

  constructor() { }

  public async getKingdomsData() : Promise<TaxonData[]> {
      return await fetch(this.apiUrl + "/taxa/search?taxonomicRanks=KD")
              .then(res => res.json())
              .then(res => {
                return res._embedded.taxa.map((element: { id: number; scientificName: string; }) => 
                  new TaxonData(element.id, element.scientificName)
                );
              });
  }
}

