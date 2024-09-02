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
    this.kingdomList = await this.speciesService.getData("", this.kingdomRank, []);
    this.phylumList = await this.speciesService.getData("", this.phylumRank, []);
    this.classList = await this.speciesService.getData("", this.classRank, []);
    this.orderList = await this.speciesService.getData("", this.orderRank, []);
    this.familyList = await this.speciesService.getData("", this.familyRank, []);
    this.tribeList = await this.speciesService.getData("", this.tribeRank, []);
    this.genusList = await this.speciesService.getData("", this.genusRank, []);
    this.speciesList = await this.speciesService.getData("", this.speciesRank, []);
  }



  getNameProposition(data: TaxonData[]) : string[] {
    return data.map(d => d.name);
  }

  async onNewKingdomValue(newValue: string) {
    this.kingdomRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.kingdomRank);
    this.kingdomList = await this.speciesService.getData(newValue, this.kingdomRank, []);
  }

  async onNewPhylumValue(newValue: string) {
    this.phylumRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.phylumRank);
    this.phylumList = await this.speciesService.getData(newValue, this.phylumRank, [this.kingdomRank]);
  }

  async onNewClassValue(newValue: string) {
    this.classRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.classRank);
    this.classList = await this.speciesService.getData(newValue, this.classRank, [this.phylumRank, this.kingdomRank]);
  }

  async onNewOrderValue(newValue: string) {
    this.orderRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.orderRank);
    this.orderList = await this.speciesService.getData(newValue, this.orderRank, [this.classRank, this.phylumRank, this.kingdomRank]);
  }

  async onNewFamilyValue(newValue: string) {
    this.familyRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.familyRank);
    this.familyList = await this.speciesService.getData(newValue, this.familyRank, [this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
  }

  async onNewTribeValue(newValue: string) {
    this.tribeRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.tribeRank);
    this.tribeList = await this.speciesService.getData(newValue, this.tribeRank, [this.familyRank, this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
  }

  async onNewGenusValue(newValue: string) {
    this.genusRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.genusRank);
    this.genusList = await this.speciesService.getData(newValue, this.genusRank, [this.tribeRank, this.familyRank, this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
  }

  async onNewSpeciesValue(newValue: string) {
    this.speciesRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.speciesRank);
    this.speciesList = await this.speciesService.getData(newValue, this.speciesRank, [this.genusRank, this.tribeRank, this.familyRank, this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
  }

}
