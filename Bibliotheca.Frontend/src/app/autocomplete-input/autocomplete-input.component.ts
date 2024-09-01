import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() newValueEvent: EventEmitter<string> = new EventEmitter<string>();
  _inputValue: string = ""

  set inputValue(value: string) {
    this.newValueEvent.emit(value);
    this._inputValue = value;
  }
  get inputValue() {
    return this._inputValue;
  }

  onNewSelectedValue(value: string) {
    this.inputValue = value;
  }

}
