import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
//import { OverlayProvider } from '../../providers/overlay/overlay';
//import { BucketProvider } from '../../providers/bucket/bucket';
import { GoalProvider } from '../../providers/goal/goal';
import { CreateGoalInitPage } from '../../pages/create-goal-init/create-goal-init';


/**
 * Generated class for the SavingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saving-detail',
  templateUrl: 'saving-detail.html',
})
export class SavingDetailPage {

  goals:Array<any>;
  savingsBalance:number;
  childData:any = {
    balance:1234.56
  };
  toolTip = {
    text: 'This is the money you set aside to get larger things you can’t afford right now. Don’t forget to add a goal!',
    header: 'Saving',
    img: '/assets/imgs/save.info.svg'
  }
  addGoalButton = {
    text: 'Add a new goal',
    styles: {'font-size' : '16px'}
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountProvider, public goalProv:GoalProvider) {
  }

  ngOnInit() {
    this.goalProv.getGoals().subscribe(
      (res)=>{
        console.log('----------', res);
        this.goals = res;
        this.getBuckets();
      },
      (err)=>{
        console.log('MoneyMovePage error', err)
      },
    ()=>{
      console.log('done')
    })
  };

  getBuckets() {
    console.log('++++++++ SavingDetailPage GETTING BUCKETS!!! +++++++++');
    this.accountService.getChildBuckets().subscribe(
      (res)=>{
        
        this.savingsBalance = this.getSavingsData(res);
        console.log('savings balance: ', this.savingsBalance);
      },
      (err)=>{
        console.log('SavingDetailPage error', err)
      },
    ()=>{
      console.log('done')
    })
  }

  getSavingsData(res){
    for(var i = 0; i < res.length; i++)
    {
      console.log('-- ', res[i]);
      let bucket = res[i];
      if(bucket.type == "saving")
      {
        
        return bucket.total;
      }
    }

    return null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingDetailPage');
    
    /*setTimeout(()=>{
      this.overlayService.updateOverlayState();
    }, 100)*/
  }

  goalItemClickHandler(e) {
    console.log(e);
  }

  addGoalClickHandler() {
    console.log('addGoalClickHandler');
    this.navCtrl.push(CreateGoalInitPage);
  }

  renderImg = function(image){
    
    return {
      'background-image': `url("${image}")`,  
      'z-index': '100'     
    }

    /*return {
      'background-image': `url("assets/imgs/kid_avatar_4.png")`,  
      'top': '30px',
      'z-index': '100'
    }*/
  }

}
