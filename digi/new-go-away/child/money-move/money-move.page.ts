import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AccountDetailComponent } from '../../components/account-detail/account-detail';
import { JwtStoreProvider } from '../../../providers/jwt-store/jwt-store'
import { GatekeeperPage } from '../../gatekeeper/gatekeeper';
import { AccountProvider } from '../../../providers/account/account';
import { OverlayProvider } from '../../../providers/overlay/overlay';
import { BucketProvider } from '../../../providers/bucket/bucket';
import { MoneyPileMoveComponent } from '../../../components/money-pile-move/money-pile-move'

/**
 * Generated class for the MoneyMovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-money-move',
  templateUrl: 'money-move.html',
})
export class MoneyMovePage {

  // use viewchild so you can call animation menthod in the MoneyPileMoverComponent
  @ViewChild(MoneyPileMoveComponent) moneyPileMover:MoneyPileMoveComponent;
  tempData: any;
  chData: any;
  // data for transferring bucket to bucket
  from_bucket_id:number;
  to_bucket_id:number;
  amount:number;
  input = {
    placeholder: 'Enter amount',
    type: 'number',
    function:($event) => this.amount = parseFloat($event)
  }

  cardInput = {
    text: 'How much money would you like to transfer from investing to giving?',
    btnText: 'Lets do it!',
    function:(e) => this.submitTransfer(e)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private jwtStoreService: JwtStoreProvider, private accountService: AccountProvider, private bucketService: BucketProvider, private overlayService: OverlayProvider) {
  }

  /*
    async ngOnInit() {
    console.log('ngOnInit MoneyMovePage');

    this.accountService.getChildAccount(1)
    .subscribe(
      (res)=>{
        console.log(res)
        this.chData = res;
        console.log('------- MoneyMovePage  chData:', this.chData)
      },
      (err)=>{
        console.log('MoneyMovePage error', err)
      },
    ()=>{
      console.log('done')
    })
  }
  */

  async ngOnInit() {
    console.log('ngOnInit MoneyMovePage');

    this.accountService.getChildAccount(1)
    .subscribe(
      (res)=>{
        console.log(res)
        this.tempData = res;
        console.log('------- MoneyMovePage  chData:', this.chData);
        this.getBuckets();
      },
      (err)=>{
        console.log('MoneyMovePage error', err)
      },
    ()=>{
      console.log('done')
    })
  }

  getBuckets() {
    console.log('++++++++ GETTING BUCKETS!!! +++++++++');
    this.accountService.getChildBuckets().subscribe(
      (res)=>{

        res.sort(function(a, b){return a.id - b.id});
        console.log(res);
        for(let i = 0; i < res.length; i++)
        {
          res[i].total = eval(res[i].total)
        }
        this.tempData.buckets = res;
        this.chData = this.tempData;
        console.log('------- MoneyMovePage  chData:', this.chData)
      },
      (err)=>{
        console.log('MoneyMovePage error', err)
      },
    ()=>{
      console.log('done')
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyMovePage');
  }

  onTransferSelected(e) {
    console.log("onTransferSelected", e);
    let fromBucket = e.from;
    this.from_bucket_id = this.setID(fromBucket);
    let toBucket = e.to;
    this.to_bucket_id = this.setID(toBucket);
    //this.cardInput.text = "How much money would you like to transfer from " + fromBucket + " to " + toBucket + "?";
    this.cardInput.text = `How much money would you like to transfer from ${fromBucket} to ${toBucket}?`;

    this.showTransfer();
  }

  setID(name){
    var num = null;
    switch(name){
      case "spending":
      num = 1;
      break;

      case "saving":
      num = 2;
      break;

      case "giving":
      num = 3;
      break;

      case "investing":
      num = 4;
      break;
    }

    return num;
  }

  showTransfer(){
    this.overlayService.updateOverlayState();
  }
  submitTransfer(e){
    console.log('submitTransfer:', e)
    const data = {
      from_bucket_id: this.from_bucket_id,
      to_bucket_id: this.to_bucket_id,
      amount: this.amount
    }
    console.log("submitTransfer, data\n", data);
    this.bucketService.transfer(data).subscribe(
      (res)=>{
        console.log('result: ', res);
        this.overlayService.updateOverlayState();
        this.moneyPileMover.animateTransfer(this.amount);
        this.amount = null;
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
}
