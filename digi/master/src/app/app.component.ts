import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GatekeeperPage } from '../pages/gatekeeper/gatekeeper';
import { NavController } from 'ionic-angular';
import { JwtStoreProvider } from '../providers/jwt-store/jwt-store';

// testing remove before pr to master

import { InvestDetailPage } from '../pages/invest-detail/invest-detail';
import { SpendingDetailPage } from '../pages/spending-detail/spending-detail';
import { SavingDetailPage } from '../pages/saving-detail/saving-detail';
import { GivingDetailPage } from '../pages/giving-detail/giving-detail';
import { MoneyMovePage } from '../pages/money-move/money-move';
import { MyWalletPage } from '../pages/my-wallet/my-wallet'

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = GatekeeperPage;

  @ViewChild(Nav) navCtrl: NavController;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private jwtStoreService: JwtStoreProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logout(): void {
    console.log('logout')
    this.jwtStoreService.clearJwt()
      .then(() => {
        this.navCtrl.setRoot(GatekeeperPage);
      })
  }

  //Testing purposes please remove future chet or people
  hideAlert = true;
  goPage(target) {
    let page;
    switch (target) {
      case 'account':
        page = MyWalletPage;
        break;
      case 'move':
        page = MoneyMovePage;
        break;
      case 'invest':
        page = InvestDetailPage;
        break;
      case 'save':
        page = SavingDetailPage;
        break;
      case 'spend':
        page = SpendingDetailPage;
        break;
      case 'give':
        page = GivingDetailPage;
        break;
      default:
        return;
    }
    this.navCtrl.setRoot(page);
  }
}

