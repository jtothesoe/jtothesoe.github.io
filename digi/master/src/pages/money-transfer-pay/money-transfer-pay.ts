import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoneyTransferCompletePage } from '../money-transfer-complete/money-transfer-complete';
import { MoneyTransferInitPage } from '../money-transfer-init/money-transfer-init';
import { MoneyTransferNamePage } from '../money-transfer-name/money-transfer-name';
import { MoneyTransferDatePage } from '../money-transfer-date/money-transfer-date';
import { MoneyTransferRepeatPage } from '../money-transfer-repeat/money-transfer-repeat';
import { TransferProvider } from '../../providers/transfer/transfer';
/**
 * Generated class for the MoneyTransferPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private transferService: TransferProvider) {
    console.log(this.navParams.get('transfer'));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyTransferPayPage');

  }

  pay(){

    this.transferService.transfer(this.finalTransfer).subscribe(
      (res)=>{
        console.log('result: ', res);
        this.navCtrl.setRoot(MoneyTransferCompletePage, {transfer: this.finalTransfer})

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
        page = MoneyTransferInitPage;
        break;
      case 'note':
        page = MoneyTransferNamePage;
        break;
      case 'date':
        page = MoneyTransferDatePage;
        break;
      case 'repeat':
        page = MoneyTransferRepeatPage;
        break;
      default:
        return;
    }
    this.navCtrl.push(page, {transfer: this.finalTransfer});


  }



}
