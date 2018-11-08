import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyWalletPage } from '../my-wallet/my-wallet';
/**
 * Generated class for the ChallengesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html',
})
export class ChallengesPage {
  flatState = 'init';

  flats = [{
    img : {'background-image' : 'url("../../assets/imgs/challenge-init.flat.jpg")'},
    state: 'init',
    func : () => {this.flatState = this.flats[2].state}
  },
  { 
    img : {'background-image' : 'url("../../assets/imgs/expense.flat.jpg")'},
    state: 'expenses',
    func : () => { this.flatState = this.flats[2].state}
  },
  { 
    img : {'background-image' : 'url("../../assets/imgs/bill.flat.jpg")'},
    state: 'bills',
    func : () => { this.flatState = this.flats[1].state}
  }]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengesPage');
  }

  back(){
    if(this.flatState !== 'init'){
      this.flatState = 'init'
    }
    else{
      this.navCtrl.setRoot(MyWalletPage);
    }
  }

}
