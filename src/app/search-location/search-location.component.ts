import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {HttpClient} from "@angular/common/http";
declare var $:JQueryStatic;

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit, AfterViewInit, OnDestroy {

  remoteData;
  profileTypes;
  isLoadingResult;
  isLoadingResultTypes;
  errorMsg;
  keyword="description";
  profileTypeSelected
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
    let params = {searchTerm: event};
    if(this.apiEndPoint == 'ProfileLookupSearch' && this.profileTypeSelected){
      params['criteria'] = this.profileTypeSelected.value;
    }
    endpoint = endpoint == '' ? this.apiEndPoint : endpoint;
    if(endpoint == '') return;
    this._http._get("lookup/"+endpoint, params)
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

  getProfileTypeServerResponse(event, endpoint='') {

    this.isLoadingResultTypes = true;
    let params = {searchTerm: event};
    if(endpoint == '') return;
    this._http._get("lookup/"+endpoint, params)
      .subscribe(data => {
        if (data['data']['results'] == undefined) {
          this.remoteData = [];
          this.errorMsg = data['Error'];
        } else {
          this.profileTypes = data['data']['results'];
        }
        this.isLoadingResultTypes = false;
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

  selectProfileTypeEvent (item) {
    // do something with selected item
    console.log(item);
    this.profileTypeSelected = item;
  }

  searchCleared() {
    console.log('searchCleared');
    this.remoteData = [];
    this.profileTypes = [];
  }

  ngOnDestroy() {
  }

}
