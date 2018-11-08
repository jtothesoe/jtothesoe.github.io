import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestHandlerProvider } from '../request-handler/request-handler';
/*
  Generated class for the TransferProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransferProvider {

  constructor(private requestHandler: RequestHandlerProvider) {
    console.log('Hello TransferProvider Provider');
  }

  transfer({child_id, amount, date, note, repeat}) : Observable<any>{

    if(!amount || !date){
      return Observable.throw({message: 'Input is invalid'});
    }

    return this.requestHandler.postAuthRequest({child_id, amount, date, note, repeat}, '/transfer');
  }

  check({date}) : Observable<any>{

    return this.requestHandler.postAuthRequest({date}, '/transfer/check');
  }

}
