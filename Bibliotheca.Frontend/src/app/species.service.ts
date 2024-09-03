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
    return await fetch(this.apiUrl + "/taxa/search?scientificNames=" + value +  "&taxonomicRanks=" + rank.rank + "&page=1&size=1")
            .then(res => res.ok ? res.json() : {page: {size: 0}})
            .then(res => {
              if (res.page.size == 0) {
                rank.id = -1;
              }
              let taxa = res._embedded.taxa[0];
              if (taxa.scientificName != value) {
                rank.id = -1;
              } else {
                rank.id = taxa.id;
              }
              return rank;
              });
  }

  public async getData(termBeginning: string, actualRank: TaxonRank, superiorTaxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    let smallestFilterRank: TaxonRank | undefined = superiorTaxonRanks.find(rank => rank.id != -1);

    if (smallestFilterRank == undefined) {
      return await fetch(this.apiUrl + "/taxa/autocomplete?taxonomicRanks=" + actualRank.rank +  "&term=" + termBeginning + "&page=1&size=10")
            .then(res => res.ok ? res.json() : {_embedded: null})
            .then(res => {
              return (res._embedded ?? {taxa: []}).taxa.map((element: { id: number; scientificName: string; }) => 
                new TaxonData(element.id, element.scientificName)
              );
            });
    }
    let page: number = 1;
    let result: TaxonData[] = [];
    while (result.length != 10) {
        let taxonData: TaxonData | null = await fetch(this.apiUrl + "/taxa/autocomplete?taxonomicRanks=" + actualRank.rank +  "&term=" + termBeginning + "&page=" + page + "&size=1")
            .then(res => res.ok ? res.json() : {_embedded: null})
            .then(async res => {
              if (res._embedded == null) {
                return null;
              }
              let taxa = res._embedded.taxa[0];
              let id = taxa.id;
              let name = taxa.name;
              if (await this.isTaxonSonOfSelectedTaxonId(id, smallestFilterRank.id)) {
                return new TaxonData(id, name);
              } else {
                return new TaxonData(-1, 'invalid');
              }
            });
        if (taxonData == null) {
          break;
        }
        if (taxonData.id != -1) {
          result.push(taxonData);
        }
      }
      return result;
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

