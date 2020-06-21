import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import { HttpClient } from '@angular/common/http';
import { CONFIGS} from "../assets/configs/config";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private _auth:AuthService, private appConfigService: ConfigService) {}

  public _get(url, params={}) {
    let headers = new HttpHeaders().set(this._auth.getAuthKey(),  this._auth.getToken());
    return this.http.get(this.appConfigService.apiBaseUrl+url, {
      params: params,
      headers: headers
    })
  }

  public _getApi (url, params={}) {
    let headers = new HttpHeaders().set(this._auth.getAuthKey(),  this._auth.getToken());
    return this.http.get(this.appConfigService.apiBaseUrl, {
      params: params,
      headers: headers
    })
  }
}
