import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateGoalPicturePage } from '../create-goal-picture/create-goal-picture';
import { CreateGoalConfirmPage } from '../create-goal-confirm/create-goal-confirm';

/**
 * Generated class for the CreateGoalCostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-goal-cost',
  templateUrl: 'create-goal-cost.html',
})
export class CreateGoalCostPage {

  input = {
    placeholder: 'Enter amount',
    type: 'number',
    function:($event) => this.amount = parseFloat($event)
  }

  header = {
    text: 'How much money does this goal cost?',
    textStyle: {'color' : 'white'}
  }

  nextButton = {
    text: 'Next'
  }

  goal= this.navParams.get('goal');
  amount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGoalCostPage');
  }

  next(){
    if(this.amount && this.amount > 0){
      let goal = Object.assign(this.goal, {cost: this.amount});
      
      if(this.goal.date){
        this.navCtrl.push(CreateGoalConfirmPage, {goal});
      }
      else{
        this.navCtrl.push(CreateGoalPicturePage, {goal});
      }
    }
  }

}
