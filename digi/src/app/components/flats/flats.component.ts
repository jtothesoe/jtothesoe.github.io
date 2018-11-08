import { Component, Input } from '@angular/core';

/**
 * Generated class for the FlatsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'flats',
  templateUrl: 'flats.html'
})
export class FlatsComponent {
  @Input() img;
  constructor() {
    console.log('Hello FlatsComponent Component');
  }

}
