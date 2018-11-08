import { Component } from '@angular/core';

/**
 * Generated class for the GlobalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
})
export class GlobalAlertComponent {

  text: string;

  constructor() {
    console.log('Hello GlobalComponent Component');
    this.text = 'Hello World';
  }

}
