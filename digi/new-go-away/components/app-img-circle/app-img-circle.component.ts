import { Component, Input } from '@angular/core';

/**
 * Generated class for the AppImgCircleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-img-circle',
  templateUrl: './app-img-circle.component.html',
  styleUrls: ['./app-img-circle.component.scss']
})
export class AppImgCircleComponent {

  @Input() styles;

  constructor() {
    console.log('Hello AppImgCircleComponent Component');
  }

}
