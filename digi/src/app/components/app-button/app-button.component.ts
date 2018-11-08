import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'app-button.component.html',
  styleUrls: ['./app-bottom.component.scss']
})
export class AppButtonComponent {

  @Input() text: string;
  @Input() color;
  @Input() styles;

  constructor() {
    
  }

}
