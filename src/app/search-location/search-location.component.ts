import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {HttpClient} from "@angular/common/http";
declare var $:JQueryStatic;

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit, AfterViewInit {

  remoteData;
  isLoadingResult;
  errorMsg;
  keyword="description";
  selectedObject;

  apiEndPoint='';
  defaultSelection= '';

  constructor(private _http: HttpService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    $("ng-autocomplete input[type='text']").on('blur', () => {
      this.selectDefaultValue();
    });
  }

  selectEvent(item) {
    // do something with selected item
    this.selectedObject = item;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }

  getServerResponse(event, endpoint='') {

    this.isLoadingResult = true;
    endpoint = endpoint == '' ? this.apiEndPoint : endpoint;
    if(endpoint == '') return;
    this._http._get("lookup/"+endpoint, {searchTerm: event})
      .subscribe(data => {
        if (data['data']['results'] == undefined) {
          this.remoteData = [];
          this.errorMsg = data['Error'];
        } else {
          this.defaultSelection = data['data']['defaultValue'];
          this.remoteData = data['data']['results'];
        }
        this.isLoadingResult = false;
      });
  }

  selectDefaultValue () {
    console.log("blured", this.remoteData.length, this.defaultSelection);
    for(let index = 0; index < this.remoteData.length; index++) {
      if(this.defaultSelection == this.remoteData[index].value) {
        this.selectedObject = this.remoteData[index];
        break;
      }
    }
  }

  searchCleared() {
    console.log('searchCleared');
    this.remoteData = [];
  }

}
