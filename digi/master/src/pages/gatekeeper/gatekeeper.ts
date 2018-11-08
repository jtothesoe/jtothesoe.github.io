import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { JwtStoreProvider } from '../../providers/jwt-store/jwt-store';
import { LoginPage } from '../login/login';
import { MyWalletPage } from '../my-wallet/my-wallet';
import { ParentDashboardPage } from '../parent-dashboard/parent-dashboard';
//import { CreateGoalInitPage } from '../create-goal-init/create-goal-init';
//import {MoneyMovePage} from '../money-move/money-move';
//import { SavingDetailPage } from '../saving-detail/saving-detail';
//import { BudgetPage } from '../budget/budget';

import 'rxjs/add/operator/map';

/**
 * Generated class for the GatekeeperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gatekeeper',
  templateUrl: 'gatekeeper.html',
})
export class GatekeeperPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  private userService: UserProvider,
    private jwtStoreService : JwtStoreProvider) {
  }

  ionViewDidLoad() {

    this.jwtStoreService.getJwt()
    .flatMap(()=>{
      return this.userService.userCheck()
    })
    .subscribe((data)=>{
      if(data.is_parent)
        this.navCtrl.setRoot(ParentDashboardPage)
      else
        this.navCtrl.setRoot(MyWalletPage)
    },
    (err)=>{
      console.log(err)
      this.navCtrl.setRoot(LoginPage);
    })
  }
}
