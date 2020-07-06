import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {CacheMechanism} from "ngx-translate-cache";
import LocalStorage = CacheMechanism.LocalStorage;
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {

  public translation;
  constructor(private _http:HttpClient) {

  }

  ngOnInit(): void {

    if(!localStorage.getItem('context_translation')) {
      this._http.get('/assets/i18n/context/translations_module.json').subscribe(response=> {
        this.translation = response;
        localStorage.setItem("context_translation", JSON.stringify(this.translation))
      });
    } else {
      this.translation = JSON.parse(localStorage.getItem('context_translation'));
    }
  }

  updateLabelsCache (){
    this._http.get('/assets/i18n/context/translations_module.json').subscribe(response=> {
      this.translation = response;
      localStorage.setItem("context_translation", JSON.stringify(this.translation))
    });
  }

}
