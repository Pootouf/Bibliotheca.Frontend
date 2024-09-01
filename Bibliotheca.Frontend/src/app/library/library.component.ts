import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-library-insect',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  standalone: true,
  imports: [SearchBarComponent]
})
export class LibraryInsectComponent {

}
