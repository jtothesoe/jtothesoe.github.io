import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestHandlerProvider } from '../request-handler/request-handler';
/*
  Generated class for the BucketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BucketProvider {

  constructor(private requestHandler: RequestHandlerProvider) {
    console.log('Hello BucketProvider Provider');
  }

  transfer({from_bucket_id, to_bucket_id, amount}) : Observable<any>{

    if(!amount){
      return Observable.throw({message: 'Input is invalid'});
    }

    return this.requestHandler.postAuthRequest({from_bucket_id, to_bucket_id, amount}, '/bucket/transfer');
  }

}
