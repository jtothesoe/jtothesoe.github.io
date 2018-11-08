import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { NavController } from '@ionic/angular';
//import { TweenMax, TimelineMax, Power2 } from 'gsap';
//TODO: FIX
/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  tabs: any[];
  currentPage:String;

  constructor(private navigationService: NavigationService, private navCtrl: NavController) {
    this.tabs = this.navigationService.getNavs();
  }

  goTo(target) {
    console.log('goto:', target);
    switch (target) {
      case 'move':
        this.navCtrl.goRoot('');
        this.currentPage = 'move';
        break;
      case 'wallet':
        this.navCtrl.goRoot('');
        this.currentPage = 'wallet';
        break;
      case 'challenge':
        this.navCtrl.goRoot('');
        this.currentPage = 'challenge';
        break;
      default:
        return;
    }

    this.highlight(target)
  }

  highlight(target) {
    console.log('highlight:', target);
    //TweenMax.to('#budget_highlight', 1, {delay:2, fill:'#000000'})
  }

}
