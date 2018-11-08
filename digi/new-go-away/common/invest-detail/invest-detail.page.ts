import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverlayProvider } from '../../../providers/overlay/overlay';
/**
 * Generated class for the InvestDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invest-detail',
  templateUrl: 'invest-detail.html',
})
export class InvestDetailPage {
  toolTip = {
    text: 'This is the money you put away and don’t touch. It can grow into even more money!',
    header: 'Investing',
    img: '/assets/imgs/invest.info.svg'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private overlayService: OverlayProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvestDetailPage');
    setTimeout(()=>{
      this.overlayService.updateOverlayState();
    }, 100)
  }



}
