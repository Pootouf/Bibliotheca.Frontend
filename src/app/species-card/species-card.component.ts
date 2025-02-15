import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-species-card',
  templateUrl: './species-card.component.html',
  styleUrl: './species-card.component.scss',
  standalone: true
})
export class SpeciesCardComponent {

  @Input() speciesName: string = "";
  @Input() vernacularName: string = "";
  @Input() imagePath: string = "";

}
