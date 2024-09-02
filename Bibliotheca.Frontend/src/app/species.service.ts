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

  public async getTaxonRankByValue(value: string, rank: string): Promise<TaxonRank> {
    return await fetch(this.apiUrl + "/taxa/search?scientificNames==" + value +  "&taxonomicRanks=" + rank + "&page=1&size=1")
            .then(res => res.ok ? res.json() : {page: {size: 0}})
            .then(res => (
              res.page.size == 0 ? 
                new TaxonRank(-1, rank) : 
                (res._embedded.taxa[0].scientificName == value ? 
                    new TaxonRank(res._embedded.taxa[0].id, rank) : 
                    new TaxonRank(-1, rank)
                )
            ));
  }

  public async getKingdomsData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "KD");
  }

  public async getPhylumsData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "PH");
  }

  public async getClassData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "CL");
  }

  public async getOrderData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "OR");
  }

  public async getFamilyData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "FM");
  }

  public async getTribeData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "TR");
  }

  public async getGenusData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "GN");
  }

  public async getSpeciesData(termBeginning: string, taxonRanks: TaxonRank[]) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "ES");
  }

  private async getData(termBeginning: string, taxonRank: string) : Promise<TaxonData[]> {
    return await fetch(this.apiUrl + "/taxa/autocomplete?taxonomicRanks=" + taxonRank +  "&term=" + termBeginning + "&page=1&size=10")
            .then(res => res.ok ? res.json() : {_embedded: null})
            .then(res => {
              return (res._embedded ?? {taxa: []}).taxa.map((element: { id: number; scientificName: string; }) => 
                new TaxonData(element.id, element.scientificName)
              );
            });
  }
}

