import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable'
/*
  Generated class for the JwtStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JwtStoreProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello JwtStoreProvider Provider');
  }

  setJwt(token: string){
    
    return this.storage.set('jwt', token);
  }

  getJwt():Observable<any> {
    return Observable.fromPromise(this.storage.get('jwt')
      .then((token)=>{
        return token;
    }))
  }

    


  clearJwt(){
    return this.storage.remove('jwt')
  }

}
