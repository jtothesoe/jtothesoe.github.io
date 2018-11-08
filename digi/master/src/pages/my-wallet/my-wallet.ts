import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountDetailComponent } from '../../components/account-detail/account-detail';
import { JwtStoreProvider } from '../../providers/jwt-store/jwt-store'
import { GatekeeperPage } from '../gatekeeper/gatekeeper';
import { IncomeDepositedPage } from '../income-deposited/income-deposited';
import { AccountProvider } from '../../providers/account/account';
import { TransferProvider } from '../../providers/transfer/transfer';
import { Slides } from 'ionic-angular';
import * as moment from 'moment';
/**
 * Generated class for the MyWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-wallet',
  templateUrl: 'my-wallet.html',
})
export class MyWalletPage implements OnInit, AfterViewInit{
  @ViewChild(Slides) slides: Slides;
  @ViewChild(AccountDetailComponent) accountDetail:AccountDetailComponent;

  chData: any;
  slideIndex:number;
  text = "hello world"

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private jwtStoreService: JwtStoreProvider, private accountService: AccountProvider, private transferService: TransferProvider) {}

  async ngOnInit() {
    console.log('ngOnInit MyWalletPage');

    this.accountService.getChildAccount(1)
    .subscribe(
      (res)=>{
        console.log(res)
        this.chData = res;
      },
      (err)=>{
        console.log(err)
      },
    ()=>{
      console.log('done')
    })
  }

  ngAfterViewInit(){
    new Promise((resolve)=>
      setTimeout(resolve, 1100)
    )
    .then(()=>{
      console.log('slides-----------', this.slides)
      this.slideIndex = this.slides.getActiveIndex();
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyWalletPage');
    const currentDate = new Date();
    console.log('currentDate', currentDate);

    const date = moment(currentDate).format('YYYY-MM-DD');
    console.log('date', date);
    console.log(typeof date);

    this.transferService.check({date}).subscribe(
      (res)=>{
        console.log('result: ', res);
        if(res.transferAmount){
          this.chData.balance = res.balance;
          this.navCtrl.push(IncomeDepositedPage, {newBalance: res});
        }
      },
      (err)=>{
        console.log('error:', err);
      }
    )
  }

  logout() : void{
    console.log('logout')
    this.jwtStoreService.clearJwt()
    .then(()=>{
      this.navCtrl.setRoot(GatekeeperPage);
    })
  }

  slideChanged() {
    this.slideIndex = this.slides.getActiveIndex();
  }


}
