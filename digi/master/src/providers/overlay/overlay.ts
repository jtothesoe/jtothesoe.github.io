import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the OverlayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OverlayProvider {

  overlayState = new BehaviorSubject('inactive');
  constructor(public http: HttpClient) {
    console.log('Hello OverlayStateProvider Provider');
  }
  getOverlayState() : Observable<any>{
    return this.overlayState;
  }

  async updateOverlayState(){
    let newState = await (this.overlayState.getValue() === 'inactive') ? 'active' : 'inactive';
    this.overlayState.next(newState);
  }

  reset(){
    this.overlayState.next('inactive');

  }

}
