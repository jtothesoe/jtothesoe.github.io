import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateGoalCostPage } from '../create-goal-cost/create-goal-cost';
import { CreateGoalConfirmPage } from '../create-goal-confirm/create-goal-confirm';


/**
 * Generated class for the CreateGoalInitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-goal-init',
  templateUrl: 'create-goal-init.html',
})
export class CreateGoalInitPage {
  header = {
    text: 'What would you like to save up for?',
    styles: {'color' : '#fff'}
  };

  input = {
    type: 'textArea',
    placeholder: 'Enter name here',
    function: (value)=>{this.getGoal(value)},
    styles: {'background-color' : '#FFF'}
  }
  nextButton = {
    text: 'Next',
    styles: {'margin-top' : '25%'}
  };

  name;
  goal = (this.navParams.get('goal')) ? this.navParams.get('goal') : null;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGoalInitPage');
  }

  getGoal(name){
    this.name = name;
  }

  next(){
    if(this.name){
      if(this.goal){
        this.goal = Object.assign(this.goal, {name: this.name});
        this.navCtrl.push(CreateGoalConfirmPage, {goal: this.goal});
      }
      else{
        let goal = Object.assign({}, {name: this.name});
        this.navCtrl.push(CreateGoalCostPage, {goal})
      }
    }
  }

}
