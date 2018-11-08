import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateGoalConfirmPage } from '../create-goal-confirm/create-goal-confirm';

/**
 * Generated class for the CreateGoalDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-goal-date',
  templateUrl: 'create-goal-date.html',
})
export class CreateGoalDatePage {

  goal = this.navParams.get('goal');
  selectedDate;

  header = {
    text: 'When do you want to reach this goal?',
    styles: {'color' : '#fff', 'margin-bottom' : '0'}
  };

  nextButton = {
    text: `Next`
  };

  calendar = {
    styles: {
      'color' : 'white'
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.goal)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGoalDatePage');
  }

  getSelectedDate(date){
    this.selectedDate = date;
  }

  next(){
    if(this.selectedDate){
      let goal = Object.assign(this.goal, {date: this.selectedDate})
      this.navCtrl.push(CreateGoalConfirmPage, {goal})
    }
  }

}
