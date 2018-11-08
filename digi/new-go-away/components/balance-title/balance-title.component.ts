import { Component, Input } from '@angular/core';

/**
 * Generated class for the BalanceTitleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'balance-title',
  templateUrl: './balance-title.component.html',
  styleUrls: ['./balance-title.component.scss']
})
export class BalanceTitleComponent {

  @Input() title: any;
  @Input() amount: any;

  constructor() {
    console.log('Hello BalanceTitleComponent Component');
  }

}
