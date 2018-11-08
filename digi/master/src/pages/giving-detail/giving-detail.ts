import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OverlayProvider } from '../../providers/overlay/overlay';
/**
 * Generated class for the GivingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-giving-detail',
  templateUrl: 'giving-detail.html',
})
export class GivingDetailPage {
  toolTip = {
    text: 'This is the money can share with loved ones, give as a gift or use to make the world better! You can even set a goal for how you want to share!',
    header: 'Giving',
    img: '/assets/imgs/give.info.svg'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private overlayService: OverlayProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GivingDetailPage');
    setTimeout(()=>{
      this.overlayService.updateOverlayState();
    }, 100)
  }

}
