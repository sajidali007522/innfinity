import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiBaseUrl = 'https://demo.innfinity.com/productsdemo/api2/';
  constructor() { }
}
