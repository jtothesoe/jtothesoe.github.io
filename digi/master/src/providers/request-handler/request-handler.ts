import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtStoreProvider } from '../jwt-store/jwt-store';
import { isDevMode } from "@angular/core";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestHandlerProvider {
  
  url = (isDevMode()) ? 'http://localhost:3000' : 'https://digipygg-api-persistent-gazelle.cfapps.io';
  
  constructor(public http: HttpClient, private jwtStoreService: JwtStoreProvider) {
    console.log('Hello RequestHandlerProvider Provider');
  }

    getRequest(path) : Observable<any>{
        return this.http.get(this.url+path)
        .map((res:Response) => res)
        .catch(this.errorHander)
    }

    postRequest(data, path) : Observable<any>{
      return this.http.post(this.url+path, data)
      .map((res:Response)=> res)
      .catch(this.errorHander)
    }

    postAuthRequest(data, path) : Observable<any>{
      console.log('++postAuthRequest path:', path);
      return this.jwtStoreService.getJwt().map((token)=>{
        return this.generateAuthHeader(token);
      })
      .switchMap((header)=>{
        console.log('switchMap:', this.url+path, data,{headers: header,})
        return this.http.post(this.url+path, data,{headers: header,})
      })
      .map((res:Response) => res)
      .catch(this.errorHander)
    }

    getAuthRequest(path) : Observable<any>{
      console.log('++getAuthRequest path:', path);
      return this.jwtStoreService.getJwt().map((token)=>{
        return this.generateAuthHeader(token);
      })
      .switchMap((header)=>{
        return this.http.get(this.url+path, {headers: header,})
      })
      .map((res:Response) => res)
      .catch(this.errorHander)
    }

    errorHander(error) :Observable<any>{
      return Observable.throw(error.error);
    }

    generateAuthHeader(token){
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer '+token);
      return headers;
    }
    
}

