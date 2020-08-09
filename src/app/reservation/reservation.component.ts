import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {DateFormatsService} from "../_services/date-formats.service";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public isLoadingResult;
  public isLoadingArrival;
  public error;
  public remoteData;
  public errorMsg;
  public defaultSelection;
  public selectedObject;

  private apiEndPoint;

  arrivalList;
  departureList;
  keyword="description";
  tab = 'flight';
  bsConfig: Partial<BsDatepickerConfig>;
  chosenDateFormat;
  minDateFrom: Date;
  minDateTo: Date;
  dateFormats;
  form = {
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
  }
  constructor(private DFService: DateFormatsService, private _http: HttpService) {
    this.apiEndPoint='CommercialAirportSearch';
    this.bsConfig = { containerClass: 'theme-dark-blue', isAnimated: true }
    this.dateFormats = this.DFService.dateFormats;
    this.minDateFrom = new Date();
    this.minDateFrom.setDate(this.minDateFrom.getDate());
    this.minDateTo = new Date();
    this.minDateTo.setDate(this.minDateFrom.getDate()+1);
  }

  ngOnInit(): void {
  }
  onFocused(e){
    // do something when input is focused
  }
  setDateTo () {
    console.log("setting date To");
    console.log(this.form);
    var dateFrom = new Date(this.form.dateFrom);
    console.log(dateFrom);
    console.log(dateFrom.getDate()+1);
    this.minDateTo.setDate(dateFrom.getDate()+1);
  }

  applyFormat (dp) {
    this.bsConfig = Object.assign(this.bsConfig, { dateInputFormat: this.chosenDateFormat });
  }

  submitIt () {
    console.log(this.form);
  }

  getServerResponse(event, searchType='departure-list') {
    this.error = {};
    if(searchType == 'departure-list') {
      this.isLoadingResult = true;
    } else {
      this.isLoadingArrival = true;
    }
    let params = {searchTerm: event};

    this._http._get("lookup/"+this.apiEndPoint, params)
      .subscribe(data => {
        if (data['data']['results'] == undefined) {
          this.remoteData = [];
          this.errorMsg = data['Error'];
        } else {
          this.defaultSelection = data['data']['defaultValue'];
          if(searchType == 'departure-list') {
            this.departureList = data['data']['results'];
          } else {
            this.arrivalList = data['data']['results'];
          }
        }
        this.isLoadingResult = false;
        this.isLoadingArrival = false;
      },error => {
        this.error = error;
        this.isLoadingResult = false;
        this.isLoadingArrival = false;
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

  selectEvent(item) {
    // do something with selected item
    this.selectedObject = item;
  }


  searchCleared() {
    console.log('searchCleared');
    this.remoteData = [];
  }

  setSearchParams (tab) {
    this.tab = tab;
    this.setApiEndPoint(tab);
  }

  private setApiEndPoint(tab) {
    switch (tab) {
      case 'flight':
        this.apiEndPoint = 'CommercialAirportSearch';
        break;
      case 'hotel':
        this.apiEndPoint = 'LocationSearch';
        break;
      case 'car':
        this.apiEndPoint = 'ProfileLookupSearch';
        break;
      case 'bundle':
        this.apiEndPoint = 'CommercialAirportSearch';
        break;
      default:
        this.apiEndPoint = 'CommercialAirportSearch';
        break;
    }
  }
}
