import { Component, OnInit } from '@angular/core';
import { TaxonData } from '../shared/taxon-data';
import { SpeciesService } from '../species.service';
import { AutocompleteInputComponent } from '../autocomplete-input/autocomplete-input.component';
import { TaxonRank } from '../shared/taxon-rank';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  imports: [AutocompleteInputComponent],
  standalone: true
})
export class SearchBarComponent implements OnInit {

  kingdomList: TaxonData[] = [];
  phylumList: TaxonData[] = [];
  classList: TaxonData[] = [];
  orderList: TaxonData[] = [];
  familyList: TaxonData[] = [];
  tribeList: TaxonData[] = [];
  genusList: TaxonData[] = [];
  speciesList: TaxonData[] = [];
  vernacularNameList: TaxonData[] = [];

  kingdomRank: TaxonRank = new TaxonRank(-1, "KD");
  phylumRank: TaxonRank = new TaxonRank(-1, "PH");
  classRank: TaxonRank = new TaxonRank(-1, "CL");
  orderRank: TaxonRank = new TaxonRank(-1, "OR");
  familyRank: TaxonRank = new TaxonRank(-1, "FM");
  tribeRank: TaxonRank = new TaxonRank(-1, "TR");
  genusRank: TaxonRank = new TaxonRank(-1, "GN");
  speciesRank: TaxonRank = new TaxonRank(-1, "ES");

  constructor(private speciesService: SpeciesService) {

  }

  async ngOnInit() {
    this.kingdomList = await this.speciesService.getKingdomsData("", []);
    this.phylumList = await this.speciesService.getPhylumsData("", []);
    this.classList = await this.speciesService.getClassData("", []);
    this.orderList = await this.speciesService.getOrderData("", []);
    this.familyList = await this.speciesService.getFamilyData("", []);
    this.tribeList = await this.speciesService.getTribeData("", []);
    this.genusList = await this.speciesService.getGenusData("", []);
    this.speciesList = await this.speciesService.getSpeciesData("", []);
  }



  getNameProposition(data: TaxonData[]) : string[] {
    return data.map(d => d.name);
  }

  async onNewKingdomValue(newValue: string) {
    this.kingdomRank = await this.speciesService.getTaxonRankByValue(newValue, this.kingdomRank.rank);
    this.kingdomList = await this.speciesService.getKingdomsData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

  async onNewPhylumValue(newValue: string) {
    this.phylumRank = await this.speciesService.getTaxonRankByValue(newValue, this.phylumRank.rank);
    this.phylumList = await this.speciesService.getPhylumsData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

  async onNewClassValue(newValue: string) {
    this.classRank = await this.speciesService.getTaxonRankByValue(newValue, this.classRank.rank);
    this.classList = await this.speciesService.getClassData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

  async onNewOrderValue(newValue: string) {
    this.orderRank = await this.speciesService.getTaxonRankByValue(newValue, this.orderRank.rank);
    this.orderList = await this.speciesService.getOrderData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

  async onNewFamilyValue(newValue: string) {
    this.familyRank = await this.speciesService.getTaxonRankByValue(newValue, this.familyRank.rank);
    this.familyList = await this.speciesService.getFamilyData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

  async onNewTribeValue(newValue: string) {
    this.tribeRank = await this.speciesService.getTaxonRankByValue(newValue, this.tribeRank.rank);
    this.tribeList = await this.speciesService.getTribeData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

  async onNewGenusValue(newValue: string) {
    this.genusRank = await this.speciesService.getTaxonRankByValue(newValue, this.genusRank.rank);
    this.genusList = await this.speciesService.getGenusData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

  async onNewSpeciesValue(newValue: string) {
    this.speciesRank = await this.speciesService.getTaxonRankByValue(newValue, this.speciesRank.rank);
    this.speciesList = await this.speciesService.getSpeciesData(newValue, [this.kingdomRank, this.phylumRank, this.classRank, this.orderRank, this.familyRank, this.tribeRank, this.genusRank, this.speciesRank]);
  }

}
