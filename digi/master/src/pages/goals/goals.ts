import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GoalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
})
export class GoalsPage {

  chData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalsPage');
  }

  getData() {
    this.chData = {
      id: 'child-1',
      budgetAmount: 204.59,
      categories: [
        { name: "spending money", spent: 25.00, budgeted: 25 },
        { name: "saving", spent: 25.02, budgeted: 46 },
        { name: "investing", spent: 25.02, budgeted: 35 },
        { name: "sharing", spent: 25.02, budgeted: 40 },
      ],
      goals: [
        { id: '1', name: "Nintendo Switch Console", url: "assets/imgs/switch.jpg", cost: 299.99, amountSaved: 10 },
        { id: '2', name: "Freestyle 18 inch Kids Bike", url: "assets/imgs/bike.png", cost: 119.99, amountSaved: 8 },
        { id: '3', name: "Uno Original Playing Cards", url: "assets/imgs/uno.png", cost: 19.99, amountSaved: 6 },
        { id: '4', name: "Beats Solo", url: "assets/imgs/beats.png", cost: 129.99, amountSaved: 2 }
      ]
    }
  }

}
