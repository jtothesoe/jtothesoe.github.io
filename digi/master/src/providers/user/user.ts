import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { RequestHandlerProvider } from '../request-handler/request-handler'
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private requestHandler: RequestHandlerProvider) {
    console.log('Hello UserProvider Provider');
  }

  login({username, password}) : Observable<any>{
    
    if(!username || !password){
      return Observable.throw({message: 'Input is invalid'});
    }  

    return this.requestHandler.postRequest({username, password}, '/user/login');
  }

  userCheck() : Observable<any>{
    return this.requestHandler.getAuthRequest('/auth/gatekeeper');
  }

}
