import { Component, OnInit } from '@angular/core';
import { TaxonData } from '../shared/taxon-data';
import { SpeciesService } from '../species.service';
import { AutocompleteInputComponent } from '../autocomplete-input/autocomplete-input.component';

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

  constructor(private speciesService: SpeciesService) {

  }

  async ngOnInit() {
    this.kingdomList = await this.speciesService.getKingdomsData("");
    this.phylumList = await this.speciesService.getPhylumsData("");
    this.classList = await this.speciesService.getClassData("");
    this.orderList = await this.speciesService.getOrderData("");
    this.familyList = await this.speciesService.getFamilyData("");
    this.tribeList = await this.speciesService.getTribeData("");
    this.genusList = await this.speciesService.getGenusData("");
    this.speciesList = await this.speciesService.getSpeciesData("");
  }



  getNameProposition(data: TaxonData[]) : string[] {
    return data.map(d => d.name);
  }

  async onNewKingdomValue(newValue: string) {
    this.kingdomList = await this.speciesService.getKingdomsData(newValue);
  }

  async onNewPhylumValue(newValue: string) {
    this.phylumList = await this.speciesService.getPhylumsData(newValue);
  }

  async onNewClassValue(newValue: string) {
    this.classList = await this.speciesService.getClassData(newValue);
  }

  async onNewOrderValue(newValue: string) {
    this.orderList = await this.speciesService.getOrderData(newValue);
  }

  async onNewFamilyValue(newValue: string) {
    this.familyList = await this.speciesService.getFamilyData(newValue);
  }

  async onNewTribeValue(newValue: string) {
    this.tribeList = await this.speciesService.getTribeData(newValue);
  }

  async onNewGenusValue(newValue: string) {
    this.genusList = await this.speciesService.getGenusData(newValue);
  }

  async onNewSpeciesValue(newValue: string) {
    this.speciesList = await this.speciesService.getSpeciesData(newValue);
  }

}
