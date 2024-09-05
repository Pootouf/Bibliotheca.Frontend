import { Component, OnInit } from '@angular/core';
import { TaxonData } from '../shared/taxon-data';
import { SpeciesService } from '../species.service';
import { AutocompleteInputComponent } from '../autocomplete-input/autocomplete-input.component';
import { TaxonRank } from '../shared/taxon-rank';
import { SpeciesRank } from '../species-rank';

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
  genusList: TaxonData[] = [];
  speciesList: TaxonData[] = [];
  vernacularNameList: TaxonData[] = [];

  kingdomRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Kingdom.name);
  phylumRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Phylum.name);
  classRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Class.name);
  orderRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Order.name);
  familyRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Family.name);
  genusRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Genus.name);
  speciesRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Species.name);

  kingdomValue: string = "";
  phylumValue: string = "";
  classValue: string = "";
  orderValue: string = "";
  familyValue: string = "";
  genusValue: string = "";
  speciesValue: string = "";

  constructor(private speciesService: SpeciesService) {

  }

  async ngOnInit() {
    this.kingdomList = await this.speciesService.getData("", this.kingdomRank, []);
    this.phylumList = await this.speciesService.getData("", this.phylumRank, []);
    this.classList = await this.speciesService.getData("", this.classRank, []);
    this.orderList = await this.speciesService.getData("", this.orderRank, []);
    this.familyList = await this.speciesService.getData("", this.familyRank, []);
    this.genusList = await this.speciesService.getData("", this.genusRank, []);
    this.speciesList = await this.speciesService.getData("", this.speciesRank, []);
  }



  getNameProposition(data: TaxonData[]) : string[] {
    return data.map(d => d.name);
  }

  async onNewKingdomValue(newValue: string) {
    this.kingdomValue = newValue;
    this.kingdomRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.kingdomRank);
    this.kingdomList = await this.speciesService.getData(newValue, this.kingdomRank, []);
    this.onNewPhylumValue(this.phylumValue);
  }

  async onNewPhylumValue(newValue: string) {
    this.phylumValue = newValue;
    this.phylumRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.phylumRank);
    this.phylumList = await this.speciesService.getData(newValue, this.phylumRank, [this.kingdomRank]);
    this.onNewClassValue(this.classValue);
  }

  async onNewClassValue(newValue: string) {
    this.classValue = newValue;
    this.classRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.classRank);
    this.classList = await this.speciesService.getData(newValue, this.classRank, [this.phylumRank, this.kingdomRank]);
    this.onNewOrderValue(this.orderValue);
  }

  async onNewOrderValue(newValue: string) {
    this.orderValue = newValue;
    this.orderRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.orderRank);
    this.orderList = await this.speciesService.getData(newValue, this.orderRank, [this.classRank, this.phylumRank, this.kingdomRank]);
    this.onNewFamilyValue(this.familyValue);
  }

  async onNewFamilyValue(newValue: string) {
    this.familyValue = newValue;
    this.familyRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.familyRank);
    this.familyList = await this.speciesService.getData(newValue, this.familyRank, [this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
    this.onNewGenusValue(this.genusValue);
  }

  async onNewGenusValue(newValue: string) {
    this.genusValue = newValue;
    this.genusRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.genusRank);
    this.genusList = await this.speciesService.getData(newValue, this.genusRank, [this.familyRank, this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
    this.onNewSpeciesValue(this.speciesValue);
  }

  async onNewSpeciesValue(newValue: string) {
    this.speciesValue = newValue;
    this.speciesRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.speciesRank);
    this.speciesList = await this.speciesService.getData(newValue, this.speciesRank, [this.genusRank, this.familyRank, this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
  }

}
