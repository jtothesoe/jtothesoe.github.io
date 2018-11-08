import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AccountProvider } from '../../../providers/account/account';


/**
 * Generated class for the BudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {

  chData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }

  async ngOnInit() {


    console.log('ngOnInit BudgetPage');

    /*
    this.accountService.getChildAccount(1)
    .subscribe(
      (res)=>{
        console.log(res)
        this.chData = res;
        console.log('------- BudgetPage  chData:', this.chData);
      },
      (err)=>{
        console.log('BudgetPage error', err)
      },
    ()=>{
      console.log('done')
    })*/


    this.chData = {
      id: 'child-1',
      budgetAmount: 150,
      budgetMax: 150,
      categories: [
        { name: "spending money", spent: 25.00, budgeted: 25 },
        { name: "saving", spent: 25.02, budgeted: 50 },
        { name: "investing", spent: 25.02, budgeted: 35 },
        { name: "sharing", spent: 25.02, budgeted: 40 },
      ]
    }
  }


  /*
    {monthlySpending: 0, monthlyEarning: 0, weeklySpending: 0, weeklyEarning: 0, balance: 412.59}
  */


}
