import { Component, Input } from '@angular/core';

/**
 * Generated class for the AppListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent {

  @Input() text: string;
  @Input() header: string;
  @Input() img: string;

  constructor() {
    console.log('Hello AppListComponent Component');
    this.text = 'Hello World';
  }

}
