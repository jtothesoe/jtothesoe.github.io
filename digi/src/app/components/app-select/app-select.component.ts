import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: 'app-select.html'
})
export class AppSelectComponent {

  @Input() selections;
  @Output() selectionEvent = new EventEmitter();
  selected;
  selectedIndex;

  constructor() {
  }

  updateSelected(i){
    this.selectionEvent.emit(i);
    this.selectedIndex = i;
  }

}
