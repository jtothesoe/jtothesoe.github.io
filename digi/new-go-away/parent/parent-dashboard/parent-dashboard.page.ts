import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ParentService } from '../../../services/parent.service';
import { OverlayService } from '../../../services/overlay.service';

/**
 * Generated class for the ParentDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-parent-dashboard',
  templateUrl: 'parent-dashboard.html',
})
export class ParentDashboardPage {

  childData:any;
  placeholderAvatar = "assets/imgs/avatar-ph.svg";
  tabState = 'active';

  closeIcon = {
    icon: 'close',
    iconStyle: {'font-weight' : 'bolder'},
    buttonStyle: {'width' : '40px', 'height': '40px'}
  }

  flats = {
    img : {'background-image' : 'url("../../assets/imgs/parent-resource.flat.jpg")'}
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private parentService: ParentService, private overlayService: OverlayService) {
    this.getData();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentDashboardPage');
  }

  getData() {
    console.log('ParentDashboardPage getData()');
    this.parentService.getChildren().subscribe(
      (res)=>{
        console.log('result: ', res);
        this.childData = res;
      },
      (err)=>{
        console.log('error:', err);
      }
    )
  }

  viewChild(index) {
    console.log('viewChild: ', this.childData[index]);
    this.navCtrl.goForward('/parent/child/detail');
  }

  triggerOverlay(){
    this.overlayService.updateOverlayState();
    this.tabState = (this.tabState == 'active') ? 'inactive' : 'active';

  }

}
