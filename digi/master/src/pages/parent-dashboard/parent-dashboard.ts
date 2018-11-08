import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChildDetailPage} from '../child-detail/child-detail';
import { ParentProvider } from '../../providers/parent/parent';
import { OverlayProvider } from '../../providers/overlay/overlay';

/**
 * Generated class for the ParentDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private parentService: ParentProvider, private overlayService: OverlayProvider) {
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
    this.navCtrl.push(ChildDetailPage, {child: this.childData[index]});
  }

  triggerOverlay(){
    this.overlayService.updateOverlayState();
    this.tabState = (this.tabState == 'active') ? 'inactive' : 'active';

  }

}
