import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoneyTransferPayPage } from '../money-transfer-pay/money-transfer-pay';
import { MoneyTransferDatePage } from '../money-transfer-date/money-transfer-date';
/**
 * Generated class for the MoneyTransferNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-money-transfer-name',
  templateUrl: 'money-transfer-name.html',
})
export class MoneyTransferNamePage {
  text="why are you sending this money?"
  transferName;
  input = {
    type: 'textArea',
    placeholder: 'Enter name here',
    function: (value)=>{this.getName(value)},
  }

  transfer = this.navParams.get('transfer');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyTransferNamePage');
  }

  getName(name){
    this.transferName = name;
  }

  continue(){
    
    if(this.transferName){
      if(this.transfer.repeat){
        this.transfer = Object.assign(this.transfer, {note: this.transferName});
        this.navCtrl.push(MoneyTransferPayPage, {transfer: this.transfer});
      }
      else{
        this.transfer = Object.assign(this.transfer, {note: this.transferName});
        this.navCtrl.push(MoneyTransferDatePage, {transfer : this.transfer});
      }
    }

  }
}
