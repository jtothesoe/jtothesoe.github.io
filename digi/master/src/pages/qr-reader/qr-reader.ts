import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FamilyRequestProvider } from '../../providers/family-request/family-request';

/**
 * Generated class for the QrReaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-reader',
  templateUrl: 'qr-reader.html',
})
export class QrReaderPage{

  ionViewDidLoad() {}

  constructor(public navCtrl: NavController, private familyRequestService: FamilyRequestProvider) {}

  scanQr(event){
    this.familyRequestService.scanQr(event)
    .subscribe((res)=>{
      console.log(res);
    },
    (e)=>{
      console.log(e);
    })
  }
}
