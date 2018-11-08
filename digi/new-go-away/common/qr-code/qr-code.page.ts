import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FamilyRequestProvider } from '../../../providers/family-request/family-request';
/**
 * Generated class for the QrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})

export class QrCodePage implements OnInit{
  hash:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public familyRequestService: FamilyRequestProvider) {
  }

  ngOnInit(){
    this.familyRequestService.getQrHash()
    .subscribe((res)=>{
      this.hash = res.hash;
      console.log(this.hash)
    },
    (e)=>{
      console.log(e)
    })
  }



}
