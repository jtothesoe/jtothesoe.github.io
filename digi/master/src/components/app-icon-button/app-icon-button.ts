import { Component, Input} from '@angular/core';

/**
 * Generated class for the AppIconButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-icon-button',
  templateUrl: 'app-icon-button.html'
})
export class AppIconButtonComponent {
  @Input() icon: string;
  @Input() text: string;
  @Input() color: string;
  @Input() buttonStyle;
  @Input() iconStyle;
  
  constructor() {}
}
