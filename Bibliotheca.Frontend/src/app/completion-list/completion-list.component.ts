import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-completion-list',
  templateUrl: './completion-list.component.html',
  styleUrl: './completion-list.component.scss',
  standalone: true
})
export class CompletionListComponent {

  @Input() autocompleteProposition: string[] = [];
  @Output() newSelectedValueEvent: EventEmitter<string> = new EventEmitter<string>();

  onProposalClick(event: any) {
    this.newSelectedValueEvent.emit(event.target.value);
  }

}
