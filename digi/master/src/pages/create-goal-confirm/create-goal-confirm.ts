import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CreateGoalPicturePage } from '../create-goal-picture/create-goal-picture';
import { CreateGoalInitPage } from '../create-goal-init/create-goal-init';
import { CreateGoalDatePage } from '../create-goal-date/create-goal-date';
import { CreateGoalCostPage } from '../create-goal-cost/create-goal-cost';
import { GoalProvider } from '../../providers/goal/goal';
import { SavingDetailPage } from '../../pages/saving-detail/saving-detail';

/**
 * Generated class for the CreateGoalConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-goal-confirm',
  templateUrl: 'create-goal-confirm.html'
})

export class CreateGoalConfirmPage {
  @ViewChild('imgElement') imgElement:any;
  imgLib = new Image();
  goal = this.navParams.get('goal');

  goalFormat = {
    name: {
      name:'My goal:  ',
      edit: true,
      format: null,
    },
    cost: {
      name: 'It costs ',
      format: 'currency',
      edit: true
    },
    date: {
      name:'I want it by ',
      format: 'date',
      edit: true
    }
  }

  image = {
    src: this.goal.img ,
    img : (type)=>{
      return this.renderImg(this.image.src, type);
    }
  }

  confirmButton = {
    text: `Create my goal`
  }
  editIcon = {
    icon: 'create',
    buttonStyles: {
      'width' : '45px',
      'height' : '45px'
    },
    textStyles : {
      'font-size' : '25px'
    }
  }

  alert: any;

  loading = this.loadingCrtl.create({
    content: 'Creating your goal'
  })
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCrtl: LoadingController, 
    private alertCtrl: AlertController, private goalService: GoalProvider) {}

  ionViewDidLoad() {}

  renderImg = function(image, type){
    let imgHolder = (image) ? image : '../assets/imgs/piggy.svg';

    let style =  {
      'background-image': `url("${imgHolder}")`,  
      'top': '30px',
      'z-index': '100',
         
    }

    return (type === 'mask') ? style : Object.assign(style, {'left' : '35%'});
  }

  createAlert({header, text}){
    this.alert = this.alertCtrl.create({
      title: header,
      subTitle: text,
      buttons: [{
        text: 'Done',
        handler: () => {
          this.alert.dismiss();
          this.navCtrl.setRoot(SavingDetailPage);
          return false;
        }
      }]
    });
  }
  
  doneLoading(alertText){
    this.createAlert(alertText);

    setTimeout(()=>{
      this.loading.dismiss();

      setTimeout(()=>{
        this.alert.present();
      }, 100)
    }, 1000);
    
  }

  editContent(target){
    let page;
    switch(target){
      case 'picture':
        page = CreateGoalPicturePage;
        break;
      case 'name':
        page = CreateGoalInitPage;
        break;
      case 'date':
        page = CreateGoalDatePage
        break;
      case 'cost':
        page = CreateGoalCostPage
        break;
      default:
        return;
    }

    this.navCtrl.push(page, {goal : this.goal});
  }

  confirm(){
    this.loading.present();
    this.submitGoal(this.goal)
  }


  submitGoal(data){
    let alertText: any;

    this.goalService.createGoal(data)
    .subscribe(
      ()=>{
        alertText = {header: 'Success', text: 'Your goal was successfully created'};
      }, 
      ()=>{
        alertText = {header: 'Failed', text: 'Sorry, something has happened. Please try again later'};
        this.doneLoading(alertText);
      },
      ()=>{
        this.doneLoading(alertText);
    })
  }
}
