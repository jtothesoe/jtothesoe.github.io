import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'app-button.html'
})
export class AppButtonComponent {

  @Input() text: string;
  @Input() color;
  @Input() styles;

  constructor() {
    
  }

}
