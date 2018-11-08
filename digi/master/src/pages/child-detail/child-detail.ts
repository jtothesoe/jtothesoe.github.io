import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoneyTransferInitPage } from '../money-transfer-init/money-transfer-init';
/**
 * Generated class for the ChildDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-child-detail',
  templateUrl: 'child-detail.html',
})
export class ChildDetailPage {

  child = this.navParams.get('child');
  placeholderAvatar = "assets/imgs/avatar-ph.svg";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildDetailPage');
  }

  goToTransfer(){
    let {firstname, id} = this.child;
    this.navCtrl.push(MoneyTransferInitPage, {child : {firstname, child_id: id}});
  }

}
