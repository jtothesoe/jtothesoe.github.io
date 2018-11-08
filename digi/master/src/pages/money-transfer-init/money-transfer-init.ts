import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoneyTransferNamePage } from '../money-transfer-name/money-transfer-name';
import { MoneyTransferPayPage } from '../money-transfer-pay/money-transfer-pay';
/**
 * Generated class for the MoneyTransferInitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-money-transfer-init',
  templateUrl: 'money-transfer-init.html',
})
export class MoneyTransferInitPage {
  progression = 1;
  transfer = this.navParams.get('transfer');
  child = (this.transfer) ? this.navParams.get('transfer') : this.navParams.get('child');
  text = `How much money would you like to transfer to ${this.child.firstname}?`;
  amount = (this.transfer) ? this.transfer.amount : null;

  input = {
    placeholder: 'Enter amount',
    type: 'number',
    function:($event) => this.amount = parseFloat($event)
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyTransferInitPage');
  }

  continue(){
    let {firstname, child_id} = this.child;

    if(this.amount > 0){
      if(this.transfer){
        this.transfer = Object.assign(this.transfer, {amount: this.amount});
        this.navCtrl.push(MoneyTransferPayPage, {transfer: this.transfer});
      }
      else{
        let transfer = Object.assign({firstname, child_id},{amount: this.amount})
        this.navCtrl.push(MoneyTransferNamePage, {transfer});
      }

    }
  }



}
