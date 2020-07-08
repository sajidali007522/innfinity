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
  private version;
  constructor(private _http:HttpClient) {

  }

  ngOnInit(): void {
    let context = {data: [], version: ''};
    if(!localStorage.getItem('context_translation')) {
      this.updateLabelsCache(context);
    } else {
      context = JSON.parse(localStorage.getItem('context_translation'));
      this.translation = context.data;
      this.updateLabelsCache(context)
    }
  }

  updateLabelsCache (translation) {

    this._http.get('http://coddrule.com/dev/test-api/translation-en.php?version='+translation.version).subscribe(response=> {
      if(typeof response['data'] !== 'undefined') {
        this.translation = response['data'];
        localStorage.setItem("context_translation", JSON.stringify(response));
      }
    });
  }

}
