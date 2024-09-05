import { Injectable } from '@angular/core';
import { TaxonData } from './shared/taxon-data';
import { environment } from '../environments/environment.development';
import { TaxonRank } from './shared/taxon-rank';
import { SpeciesRank } from './species-rank';

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
              if (res.count == 0 || res.results[0].canonicalName != value || res.results[0].nubKey == undefined) {
                rank.id = -1;
              }
              else {
                rank.id = res.results[0].nubKey;
              }
              return rank;
              });
  }

  public async getData(termBeginning: string, actualRank: TaxonRank, superiorTaxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    let smallestFilterRank: TaxonRank | undefined = superiorTaxonRanks.find(rank => rank.id != -1);
    if (smallestFilterRank == undefined) {
      return await fetch(this.apiUrl + "/species/suggest?rank=" + actualRank.rank +  "&q=" + termBeginning)
            .then(res => res.ok ? res.json() : [])
            .then(res => 
              res.map((element: { nubKey: number; canonicalName: string; }) => 
                new TaxonData(element.nubKey, element.canonicalName)
              )
            );
    }

    let parentTaxons : number[] = [smallestFilterRank.id]
    let result : TaxonData[] = []
    while (result.length < 20 && parentTaxons.length > 0) {
      let parent = parentTaxons[parentTaxons.length - 1];
      parentTaxons.pop();
      await fetch(this.apiUrl + "/species/" + parent + "/children")
          .then(res => res.ok ? res.json() : {results: []})
          .then(res => { 
            for (const element of res.results) {
              if (SpeciesRank.getSpeciesRankFromValue(element.rank).priority < SpeciesRank.getSpeciesRankFromValue(actualRank.rank).priority && element.nubKey != undefined) {
                parentTaxons.push(element.nubKey)
              } else if (actualRank.rank == element.rank) {
                result.push(new TaxonData(element.nubKey, element.canonicalName))
              }
            }
          });
    }
    return result;
  }
}

