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
    return await fetch(this.apiUrl + "/taxa/search?scientificNames==" + value +  "&taxonomicRanks=" + rank + "&page=1&size=1")
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
    return await fetch(this.apiUrl + "/taxa/autocomplete?taxonomicRanks=" + actualRank.rank +  "&term=" + termBeginning + "&page=1&size=10")
            .then(res => res.ok ? res.json() : {_embedded: null})
            .then(res => {
              return (res._embedded ?? {taxa: []}).taxa.map((element: { id: number; scientificName: string; }) => 
                new TaxonData(element.id, element.scientificName)
              );
            });
  }
}

