import { Injectable } from '@angular/core';
import { TaxonData } from './shared/taxon-data';
import { environment } from '../environments/environment.development';
import { TaxonRank } from './shared/taxon-rank';
import { SpeciesRank } from './shared/species-rank';
import { TaxonParentRank } from './shared/taxon-parent-rank';

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
              if (res.count == 0 || (res.results[0].canonicalName ?? res.results[0].scientificName) != value || res.results[0].nubKey == undefined) {
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
              res.map((element: {scientificName: string; nubKey: number; canonicalName: string;}) => 
                new TaxonData(element.nubKey, element.canonicalName ?? element.scientificName)
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
                result.push(new TaxonData(element.nubKey, element.canonicalName ?? element.scientificName))
              }
              if (result.length >= 20) {
                break;
              }
            }
          });
    }
    return result;
  }


  public async getParentRanks(id: number) : Promise<TaxonParentRank> {
    let result = new TaxonParentRank();
    await fetch(this.apiUrl + "/species/" + id + "/parents")
        .then(res => res.ok ? res.json() : [])
        .then(res => {
          for (const parent of res) {
            switch(parent.rank) {
              case SpeciesRank.Kingdom.name :
                result.kingdom = parent.canonicalName ?? parent.scientificName;
                break;
              case SpeciesRank.Phylum.name :
                result.phylum = parent.canonicalName ?? parent.scientificName;
                break;
              case SpeciesRank.Class.name : 
                result.class = parent.canonicalName ?? parent.scientificName;
                break;
              case SpeciesRank.Order.name :
                result.order = parent.canonicalName ?? parent.scientificName;
                break;
              case SpeciesRank.Family.name :
                result.family = parent.canonicalName ?? parent.scientificName;
                break;
              case SpeciesRank.Genus.name :
                result.genus = parent.canonicalName ?? parent.scientificName;
            }
          }
        });
    return result;
  }
}

