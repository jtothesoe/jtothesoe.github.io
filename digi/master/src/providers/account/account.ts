import { Injectable } from '@angular/core';
import { RequestHandlerProvider } from '../request-handler/request-handler';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {

  constructor(private requestHandler : RequestHandlerProvider) {
    console.log('Hello AccountProvider Provider');
  }

  
  getChildAccount(id) : Observable <any>{
    return this.requestHandler.postAuthRequest({child_id: id}, '/auth/account/child');
  }

  getChildBuckets() : Observable <any>{
    return this.requestHandler.getAuthRequest('/bucket');
  }

  
}
