import { Component } from '@angular/core';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { NavController } from 'ionic-angular';
import { MyWalletPage } from '../../pages/my-wallet/my-wallet';
import { ChallengesPage } from '../../pages/challenges/challenges';
import { MoneyMovePage } from '../../pages/money-move/money-move';
//import { TweenMax, TimelineMax, Power2 } from 'gsap';

/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  tabs: any[];
  currentPage:String;

  constructor(private navigationService: NavigationProvider, private navCtrl: NavController) {
    this.tabs = this.navigationService.getNavs();
  }

  goTo(target) {
    console.log('goto:', target);
    switch (target) {
      case 'move':
        this.navCtrl.setRoot(MoneyMovePage);
        this.currentPage = 'move';
        break;
      case 'wallet':
        this.navCtrl.setRoot(MyWalletPage);
        this.currentPage = 'wallet';
        break;
      case 'challenge':
        this.navCtrl.setRoot(ChallengesPage);
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
