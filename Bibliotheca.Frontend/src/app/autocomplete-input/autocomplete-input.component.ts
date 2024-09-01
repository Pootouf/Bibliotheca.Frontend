import { Component, Input } from '@angular/core';
import { CompletionListComponent } from '../completion-list/completion-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.scss',
  standalone: true,
  imports: [CompletionListComponent, FormsModule]
})
export class AutocompleteInputComponent {

  @Input() autocompleteProposition: string[] = []
  @Input() labelName: string = "";
  @Input() inputName: string = "";
  inputValue: string = "";

  onNewSelectedValue(value: string) {
    this.inputValue = value;
  }

}
