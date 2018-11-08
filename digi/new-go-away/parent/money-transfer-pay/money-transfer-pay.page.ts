import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { TransferService } from '../../../services/transfer.service';
/**
 * Generated class for the MoneyTransferPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-money-transfer-pay',
  templateUrl: 'money-transfer-pay.html',
})
export class MoneyTransferPayPage {

  text = 'You’re almost done! Please confirm your transfer.';
  finalTransfer = (this.navParams.get('transfer'));

  transferFormat = {
    firstname: {
      name:'Transfer to:',
      edit: false,
      format: null,
    },
    amount: {
      name:'Amount:',
      format: 'currency',
      edit: true
    },
    date: {
      name:'Transfer date:',
      format: 'date',
      edit: true

    },
    note: {
      name:'For:',
      format: null,
      edit: true

    },
    repeat: {
      name:'Repeat:',
      format: null,
      edit: true

    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private transferService: TransferService) {
    console.log(this.navParams.get('transfer'));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyTransferPayPage');

  }

  pay(){

    this.transferService.transfer(this.finalTransfer).subscribe(
      (res)=>{
        console.log('result: ', res);
        this.navCtrl.goRoot('/parent/transfer/complete');
      },
      (err)=>{
        console.log('error:', err);
      }
    )
  }

  goEdit(key){
    let page;
    switch(key){
      case 'amount':
        page = '/parent/transfer';
        break;
      case 'note':
        page = '/parent/transfer/name';
        break;
      case 'date':
        page = '/parent/transfer/date';
        break;
      case 'repeat':
        page = '/parent/transfer/repeat';
        break;
      default:
        return;
    }
    this.navCtrl.goForward(page);


  }



}
