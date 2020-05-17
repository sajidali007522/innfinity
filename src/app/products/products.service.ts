import { Injectable } from '@angular/core';
import {HttpService} from "../http.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products;
  constructor(private _http: HttpService) { }

  public getProducts (category) {
    return this._http._get('products', {action: 'load-products', category: category});

  }
}
