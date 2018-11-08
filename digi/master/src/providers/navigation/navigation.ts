
import { Injectable } from '@angular/core';

/*
  Generated class for the NavigationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavigationProvider {
  navs = [{
    text: 'Account',
    icon: 'icon_account'
  },{
    text: 'Budget',
    icon: 'icon_budget'
  },{
    text: 'Challenges',
    icon: 'icon_challenges'
  },{
    text: 'Activity',
    icon: 'icon_activity'
  }]

  constructor() {
    console.log('Hello NavigationProvider Provider');
  }

  getNavs(): any[]{
    return this.navs;
  }

}
