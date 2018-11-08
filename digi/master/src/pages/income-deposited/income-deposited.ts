import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IncomeDepositedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-income-deposited',
  templateUrl: 'income-deposited.html',
})
export class IncomeDepositedPage {

  newBalance = this.navParams.get('newBalance');

  page = {
    header: 'Woo hoo!',
    text: `You’ve just had $${this.newBalance.transferAmount} sent to your account!`,
    btnText: 'Return to my account',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomeDepositedPage');
    console.log("***newBalance***\n",this.newBalance);
  }

  popView(){
    this.navCtrl.pop();
  }

}
