import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestHandlerProvider } from '../request-handler/request-handler';

/*
  Generated class for the ParentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParentProvider {

  constructor(private requestHandler: RequestHandlerProvider) {
    console.log('Hello ParentProvider Provider');
  }

  getChildren() : Observable<any>{

    return this.requestHandler.getAuthRequest('/person');

  }

}
