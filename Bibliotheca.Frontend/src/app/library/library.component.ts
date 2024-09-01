import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SpeciesCardComponent } from '../species-card/species-card.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  standalone: true,
  imports: [SearchBarComponent, SpeciesCardComponent]
})
export class LibraryComponent {

}
