import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
/**
 * Generated class for the MoneyTransferNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
        this.navCtrl.goForward('/parent/transfer/pay');
      }
      else{
        this.navCtrl.goForward('/parent/transfer/date');
      }
    }

  }
}
