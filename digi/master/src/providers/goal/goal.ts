import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestHandlerProvider } from '../request-handler/request-handler';

/*
  Generated class for the GoalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoalProvider {

  constructor(private requestHandler: RequestHandlerProvider) {
    console.log('Hello GoalProvider Provider');
  }

  getGoals() : Observable<any>{
    return this.requestHandler.getAuthRequest('/auth/goal');
  }

  createGoal(data) : Observable<any>{
    return this.requestHandler.postAuthRequest(data,'/auth/goal/create')
  }

}
