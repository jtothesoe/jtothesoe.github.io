import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
/**
 * Generated class for the MoneyTransferRepeatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-money-transfer-repeat',
  templateUrl: 'money-transfer-repeat.html',
})
export class MoneyTransferRepeatPage {
  text = "Would you like this transfer to repeat?";
  transfer = this.navParams.get('transfer');
  repeatSelections = [{
    text: 'Yes, please repeat weekly',
    type: 'Weekly'
  },{
    text: 'Yes, please repeat monthly',
    type: 'Monthly'
  },{
    text: 'Do not repeat',
    type: 'none'
  }];

  selectedType;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyTransferRepeatPage');
  }

  getSelection(index){

    this.selectedType = this.repeatSelections[index].type;
  }

  continue(){
    console.log(this.transfer);
    if(this.selectedType){
        this.transfer = Object.assign(this.transfer, {repeat: this.selectedType});
        this.navCtrl.goForward('/parent/transfer/pay');    
    }
  }

}
