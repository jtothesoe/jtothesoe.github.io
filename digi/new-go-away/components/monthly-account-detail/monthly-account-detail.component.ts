import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Generated class for the MonthlyAccountDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'monthly-account-detail',
  templateUrl: './monthly-account-detail.component.html',
  styleUrls: ['./monthly-account-detail.component.scss']
})
export class MonthlyAccountDetailComponent {

  @Input() childData;
  @Input() isParent;
  balance: number;
  balance_last_month: number;
  income_last_month: number;
  spending: number;

  childName = (this.isParent) ? 'Your Child' : 'You';
  timelineSub = new Subscription();
  
  
  constructor() {
    console.log('Hello MonthlyAccountDetailComponent Component');
    
  }

  ngAfterContentInit() {
    this.initData();
  }
  
  initData() {

    this.balance = this.childData.balance
    this.income_last_month = this.childData.monthlyEarning;
    this.spending = this.childData.monthlySpending;
    this.balance_last_month = this.balance - (this.income_last_month - this.spending);
    
  }

}
