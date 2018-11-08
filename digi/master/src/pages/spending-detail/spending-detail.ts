import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverlayProvider } from '../../providers/overlay/overlay';
/**
 * Generated class for the SpendingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spending-detail',
  templateUrl: 'spending-detail.html',
})
export class SpendingDetailPage {

  toolTip = {
    text: 'This is the money you can spend on fun little things you want right now. Use it wisely!',
    header: 'Spending',
    img: '/assets/imgs/spend.info.svg'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private overlayService: OverlayProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpendingDetailPage');
    setTimeout(()=>{
      this.overlayService.updateOverlayState();
    }, 100)
  }

}
