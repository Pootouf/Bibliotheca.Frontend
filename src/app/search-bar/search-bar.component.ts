import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxonData } from '../shared/taxon-data';
import { SpeciesService } from '../species.service';
import { AutocompleteInputComponent } from '../autocomplete-input/autocomplete-input.component';
import { TaxonRank } from '../shared/taxon-rank';
import { SpeciesRank } from '../shared/species-rank';
import { TaxonParentRank } from '../shared/taxon-parent-rank';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  imports: [AutocompleteInputComponent],
  standalone: true
})
export class SearchBarComponent implements OnInit {

  //Represents the auto completion proposition
  kingdomList: TaxonData[] = [];
  phylumList: TaxonData[] = [];
  classList: TaxonData[] = [];
  orderList: TaxonData[] = [];
  familyList: TaxonData[] = [];
  genusList: TaxonData[] = [];
  speciesList: TaxonData[] = [];
  vernacularNameList: TaxonData[] = [];

  //Represents the actual id of the selected rank, -1 if none
  kingdomRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Kingdom.name);
  phylumRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Phylum.name);
  classRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Class.name);
  orderRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Order.name);
  familyRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Family.name);
  genusRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Genus.name);
  speciesRank: TaxonRank = new TaxonRank(-1, SpeciesRank.Species.name);

  //Represents the actual value for the field
  kingdomValue: string = "";
  phylumValue: string = "";
  classValue: string = "";
  orderValue: string = "";
  familyValue: string = "";
  genusValue: string = "";
  speciesValue: string = "";

  //Represents the child components
  @ViewChild('kingdomInput') kingdomInput!: AutocompleteInputComponent
  @ViewChild('phylumInput') phylumInput!: AutocompleteInputComponent
  @ViewChild('classInput') classInput!: AutocompleteInputComponent
  @ViewChild('orderInput') orderInput!: AutocompleteInputComponent
  @ViewChild('familyInput') familyInput!: AutocompleteInputComponent
  @ViewChild('genusInput') genusInput!: AutocompleteInputComponent
  @ViewChild('speciesInput') speciesInput!: AutocompleteInputComponent

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
    if (this.kingdomRank.id == -1) {
      this.phylumValue = this.phylumRank.id != -1 ? "" : this.phylumValue;
      this.phylumInput._inputValue = this.phylumValue;
      this.kingdomList = await this.speciesService.getData(newValue, this.kingdomRank, []);
    } else {
      this.kingdomList = [new TaxonData(this.kingdomRank.id, newValue)];
    }
    this.onNewPhylumValue(this.phylumValue);
  }

  async onNewPhylumValue(newValue: string) {
    this.phylumRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.phylumRank);
    if (this.phylumRank.id != -1 && newValue != this.phylumValue) {
      await this.applyParentRankValue(this.phylumRank.id)
    }
    this.phylumValue = newValue;
    if (this.phylumRank.id == -1) {
      this.classValue = this.classRank.id != -1 ? "" : this.classValue;
      this.classInput._inputValue = this.classValue;
      this.phylumList = await this.speciesService.getData(newValue, this.phylumRank, [this.kingdomRank]);
    } else {
      this.phylumList = [new TaxonData(this.phylumRank.id, newValue)];
    }
    this.onNewClassValue(this.classValue);
  }

  async onNewClassValue(newValue: string) {
    this.classRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.classRank);
    if (this.classRank.id != -1 && newValue != this.classValue) {
      await this.applyParentRankValue(this.classRank.id)
    }
    this.classValue = newValue;
    if (this.classRank.id == -1) {
      this.orderValue = this.orderRank.id != -1 ? "" : this.orderValue;
      this.orderInput._inputValue = this.orderValue;
      this.classList = await this.speciesService.getData(newValue, this.classRank, [this.phylumRank, this.kingdomRank]);
    } else {
      this.classList = [new TaxonData(this.classRank.id, newValue)];
    }
    this.onNewOrderValue(this.orderValue);
  }

  async onNewOrderValue(newValue: string) {
    this.orderRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.orderRank);
    if (this.orderRank.id != -1 && newValue != this.orderValue) {
      await this.applyParentRankValue(this.orderRank.id)
    }
    this.orderValue = newValue;
    if (this.orderRank.id == -1) {
      this.familyValue = this.familyRank.id != -1 ? "" : this.familyValue;
      this.familyInput._inputValue = this.familyValue;
      this.orderList = await this.speciesService.getData(newValue, this.orderRank, [this.classRank, this.phylumRank, this.kingdomRank]);
    } else {
      this.orderList = [new TaxonData(this.orderRank.id, newValue)];
    }
    this.onNewFamilyValue(this.familyValue);
  }

  async onNewFamilyValue(newValue: string) {
    this.familyRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.familyRank);
    if (this.familyRank.id != -1 && newValue != this.familyValue) {
      await this.applyParentRankValue(this.familyRank.id)
    }
    this.familyValue = newValue;
    if (this.familyRank.id == -1) {
      this.genusValue = this.genusRank.id != -1 ? "" : this.genusValue;
      this.genusInput._inputValue = this.phylumValue;
      this.familyList = await this.speciesService.getData(newValue, this.familyRank, [this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
    } else {
      this.familyList = [new TaxonData(this.familyRank.id, newValue)];
    }
    this.onNewGenusValue(this.genusValue);
  }

  async onNewGenusValue(newValue: string) {
    this.genusRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.genusRank);
    if (this.genusRank.id != -1 && newValue != this.genusValue) {
      await this.applyParentRankValue(this.genusRank.id)
    }
    this.genusValue = newValue;
    if (this.genusRank.id == -1) {
      this.speciesValue = this.speciesRank.id != -1 ? "" : this.speciesValue;
      this.speciesInput._inputValue = this.speciesValue;
      this.genusList = await this.speciesService.getData(newValue, this.genusRank, [this.familyRank, this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
    } else {
      this.genusList = [new TaxonData(this.genusRank.id, newValue)];
    }
    this.onNewSpeciesValue(this.speciesValue);
  }

  async onNewSpeciesValue(newValue: string) {
    this.speciesRank = await this.speciesService.calculateNewTaxonRankIdByValue(newValue, this.speciesRank);
    if (this.speciesRank.id != -1 && newValue != this.speciesValue) {
      await this.applyParentRankValue(this.speciesRank.id)
    }
    this.speciesValue = newValue;
    if (this.speciesRank.id == -1) {
      this.speciesList = await this.speciesService.getData(newValue, this.speciesRank, [this.genusRank, this.familyRank, this.orderRank, this.classRank, this.phylumRank, this.kingdomRank]);
    } else {
      this.speciesList = [new TaxonData(this.speciesRank.id, newValue)];
    }
  }

  private async applyParentRankValue(childId: number) {
    let parentRanks = await this.speciesService.getParentRanks(childId);
    if (parentRanks.kingdom != undefined) {
      this.kingdomInput._inputValue = parentRanks.kingdom;
      this.kingdomRank = await this.speciesService.calculateNewTaxonRankIdByValue(parentRanks.kingdom, this.kingdomRank);
      this.kingdomList = [new TaxonData(this.kingdomRank.id, parentRanks.kingdom)];
    }
    if (parentRanks.phylum != undefined) {
      this.phylumInput._inputValue = parentRanks.phylum;
      this.phylumRank = await this.speciesService.calculateNewTaxonRankIdByValue(parentRanks.phylum, this.phylumRank);
      this.phylumList = [new TaxonData(this.phylumRank.id, parentRanks.phylum)];
    }
    if (parentRanks.class != undefined) {
      this.classInput._inputValue = parentRanks.class;
      this.classRank = await this.speciesService.calculateNewTaxonRankIdByValue(parentRanks.class, this.classRank);
      this.classList = [new TaxonData(this.classRank.id, parentRanks.class)];
    }
    if (parentRanks.order != undefined) {
      this.orderInput._inputValue = parentRanks.order;
      this.orderRank = await this.speciesService.calculateNewTaxonRankIdByValue(parentRanks.order, this.orderRank);
      this.orderList = [new TaxonData(this.orderRank.id, parentRanks.order)];
    }
    if (parentRanks.family != undefined) {
      this.familyInput._inputValue = parentRanks.family;
      this.familyRank = await this.speciesService.calculateNewTaxonRankIdByValue(parentRanks.family, this.familyRank);
      this.familyList = [new TaxonData(this.familyRank.id, parentRanks.family)];
    }
    if (parentRanks.genus != undefined) {
      this.genusInput._inputValue = parentRanks.genus;
      this.genusRank = await this.speciesService.calculateNewTaxonRankIdByValue(parentRanks.genus, this.genusRank);
      this.genusList = [new TaxonData(this.genusRank.id, parentRanks.genus)];
    }
  }

}
