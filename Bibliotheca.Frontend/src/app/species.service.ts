import { Injectable } from '@angular/core';
import { TaxonData } from './shared/taxon-data';
import { environment } from '../environments/environment.development';
import { TaxonRank } from './shared/taxon-rank';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private apiUrl: string = environment.apiSpeciesURL;

  constructor() { }

  public async calculateNewTaxonRankIdByValue(value: string, rank: TaxonRank): Promise<TaxonRank> {
    return await fetch(this.apiUrl + "/species/search?q=" + value +  "&rank=" + rank.rank + "&limit=1")
            .then(res => res.ok ? res.json() : [])
            .then(res => {
              console.log(res)
              if (res.count == 0 || res.results[0].scientificName != value) {
                rank.id = -1;
              }
              else {
                rank.id = res.results[0].key;
              }
              return rank;
              });
  }

  public async getData(termBeginning: string, actualRank: TaxonRank, superiorTaxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    let smallestFilterRank: TaxonRank | undefined = superiorTaxonRanks.find(rank => rank.id != -1);
    return await fetch(this.apiUrl + "/species/suggest?rank=" + actualRank.rank +  "&q=" + termBeginning)
          .then(res => res.ok ? res.json() : [])
          .then(res => 
            res.map((element: { key: number; scientificName: string; }) => 
              new TaxonData(element.key, element.scientificName)
            )
          );
  }

  private async isTaxonSonOfSelectedTaxonId(taxonId: number, parentId: number): Promise<boolean> {
    return fetch(this.apiUrl + "/taxa/" + taxonId + "/classification")
      .then(res => res.ok ? res.json() : { _embedded: { taxa: [] } })
      .then(res => {
        let parents = res._embedded.taxa;
        return parents.some((parent: { id: number; }) => parent.id == parentId);
      });
  }
}

