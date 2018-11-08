import { Component, Input } from '@angular/core';

/**
 * Generated class for the AvatarImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss']
})
export class AvatarImageComponent {

  @Input() image_url:any;

  constructor() {
    console.log('Hello AvatarImageComponent Component');
  }

}
