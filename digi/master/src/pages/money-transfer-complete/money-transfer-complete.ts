import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParentDashboardPage } from '../parent-dashboard/parent-dashboard';
import { AccountProvider } from '../../providers/account/account';

@IonicPage()
@Component({
  selector: 'page-money-transfer-complete',
  templateUrl: 'money-transfer-complete.html',
})
export class MoneyTransferCompletePage {
  transfer = this.navParams.get('transfer');
  text = `$${this.transfer.amount}.00 has been transferred to ${this.transfer.firstname}`;
  header = 'Thank you!';
  childData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private accountService: AccountProvider) {
  }

  async ngOnInit() {
    this.accountService.getChildAccount(1)
      .subscribe((res) => { this.childData = res; });
  }

  dashboard(){
    this.navCtrl.setRoot(ParentDashboardPage);
  }

}
