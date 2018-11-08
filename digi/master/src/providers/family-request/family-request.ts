import { Injectable } from '@angular/core';
import { RequestHandlerProvider } from '../request-handler/request-handler';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the FamilyRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FamilyRequestProvider {

  constructor( public requestHandler: RequestHandlerProvider) {
    console.log('Hello FamilyRequestProvider Provider');
  }

  getQrHash() : Observable <any>{
    return this.requestHandler.getAuthRequest('/auth/request/get/qr');
  }

  scanQr(hash) : Observable<any>{
    return this.requestHandler.postAuthRequest({ hash }, '/auth/request/add/child');
  }
}
