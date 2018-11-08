import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: 'app-input.html'
})
export class AppInputComponent {
  @Output() inputEvent = new EventEmitter();
  @Input() type;
  @Input() placeholder;
  @Input() styles;


  value;

  constructor() {
  }

  onChange(newValue){
    this.inputEvent.emit(newValue);
  }

}
