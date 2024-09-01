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
    return this.getData(termBeginning, "KD");
  }

  public async getPhylumsData(termBeginning: string) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "PH");
  }

  public async getClassData(termBeginning: string) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "CL");
  }

  public async getOrderData(termBeginning: string) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "OR");
  }

  public async getFamilyData(termBeginning: string) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "FM");
  }

  public async getTribeData(termBeginning: string) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "TR");
  }

  public async getGenusData(termBeginning: string) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "GN");
  }

  public async getSpeciesData(termBeginning: string) : Promise<TaxonData[]> {
    return this.getData(termBeginning, "ES");
  }

  private async getData(termBeginning: string, taxonRank: string) : Promise<TaxonData[]> {
    return await fetch(this.apiUrl + "/taxa/autocomplete?taxonomicRanks=" + taxonRank +  "&term=" + termBeginning + "&page=1&size=20")
            .then(res => res.json())
            .then(res => {
              return (res._embedded ?? {taxa: []}).taxa.map((element: { id: number; scientificName: string; }) => 
                new TaxonData(element.id, element.scientificName)
              );
            });
  }
}

