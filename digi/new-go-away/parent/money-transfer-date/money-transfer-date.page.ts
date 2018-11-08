import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoneyTransferRepeatPage } from '../money-transfer-repeat/money-transfer-repeat';
/**
 * Generated class for the MoneyTransferDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-money-transfer-date',
  templateUrl: 'money-transfer-date.html',
})
export class MoneyTransferDatePage {
  text = 'Select when you would like this money transferred.';
  transfer = this.navParams.get('transfer');
  selectedDate;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyTransferDatePage');
  }

  getSelectedDate(date){
    this.selectedDate = date;
  }

  continue(){
    if(this.selectedDate){
      let transfer = Object.assign(this.navParams.get('transfer'), {date: this.selectedDate});
      this.navCtrl.push(MoneyTransferRepeatPage, {transfer});
    }

  }

}
