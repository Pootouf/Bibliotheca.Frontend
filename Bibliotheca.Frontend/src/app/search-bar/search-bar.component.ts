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
  }



  getNameProposition(data: TaxonData[]) : string[] {
    return data.map(d => d.name);
  }

  async onNewKingdomValue(newValue: string) {
    this.kingdomList = await this.speciesService.getKingdomsData(newValue);
  }

}
