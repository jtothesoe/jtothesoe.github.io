import { Component, Input } from '@angular/core';
import { trigger, state,  style, animate, transition } from '@angular/animations';


/**
 * Generated class for the AppBottomSlideTabComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-bottom-slide-tab',
  templateUrl: 'app-bottom-slide-tab.html',
  animations: [
    trigger('bottomTabState',[
      state('active', style({
        transform: 'translateY(0%)',
        opacity : '1'
      })),
      state('inactive', style({
        transform: 'translateY(100%)',
        opacity : '0'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class AppBottomSlideTabComponent {

  @Input() text;
  @Input() tabState;
  constructor() {
    console.log('Hello AppBottomSlideTabComponent Component');
  }


}
