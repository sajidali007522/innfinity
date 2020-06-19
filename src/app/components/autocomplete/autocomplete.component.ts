import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../http.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  keyword = 'name';

  data = [
    {
      id: 1,
      name: 'Dakota Gaylord PhD',
      address: '14554 Smith Mews'
    },
    {
      id: 2,
      name: 'Maria Legros',
      address: '002 Pagac Drives'
    },
    {
      id: 3,
      name: 'Brandyn Fritsch',
      address: '8542 Lowe Mountain'
    },
    {
      id: 4,
      name: 'Glenna Ward V',
      address: '1260 Oda Summit'
    },
    {
      id: 5,
      name: 'Jamie Veum',
      address: '5017 Lowe Route'
    }
  ];
  remoteData;
  errorMsg: string;
  isLoadingResult: boolean;

  constructor(private _http: HttpService, private http: HttpClient) { }

  ngOnInit() {
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

  getServerResponse(event) {

    this.isLoadingResult = true;

    this.http.get("/assets/js/data.json?" + event)
      .subscribe(data => {
        console.log(data['Search']);
        console.log(data['Search'] == undefined);
        if (data['Search'] == undefined) {
          this.remoteData = [];
          this.errorMsg = data['Error'];
        } else {
          this.remoteData = data['Search'];
        }

        this.isLoadingResult = false;
      });
  }

  searchCleared() {
    console.log('searchCleared');
    this.remoteData = [];
  }

}
