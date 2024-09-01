import { Injectable } from '@angular/core';
import { TaxonData } from './shared/taxon-data';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private apiUrl: string = environment.apiSpeciesURL;

  constructor() { }

  public async getKingdomsData(termBeginning: string) : Promise<TaxonData[]> {
      return await fetch(this.apiUrl + "/taxa/autocomplete?taxonomicRanks=KD&term=" + termBeginning + "&page=1&size=20")
              .then(res => res.json())
              .then(res => {
                return (res._embedded ?? {taxa: []}).taxa.map((element: { id: number; scientificName: string; }) => 
                  new TaxonData(element.id, element.scientificName)
                );
              });
  }
}

