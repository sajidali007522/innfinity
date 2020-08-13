import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {DateFormatsService} from "../_services/date-formats.service";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit,AfterViewInit {
  public isLoadingResult;
  public isLoadingArrival;
  public isLoadingTraveler;
  public error;
  public remoteData;
  public errorMsg;
  public defaultSelection;
  public selectedObject;
  public businessProfiles;
  public profileTypeSelected;
  public loadingTravelerList;
  public travelerList;
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
  ruleBags;
  state={
    initiateBooking: false
  };
  form = {
    BeginDate: new Date(),
    EndDate: new Date(),
    BeginTime: '',
    EndTime: '',
    IsReturn: false,
    tripType: 1,
    ResourceTypeID: "ECF6F1A3-8867-40CC-8118-5DEFB120D5EE",
    TimePropertyID: "00000000-0000-0000-0000-000000000000",
    SearchIndex: 0,
    SelectedItems: [],
    bookingID: ''
  };
  constructor(private DFService: DateFormatsService,
              private _http: HttpService,
              private router: Router
  ) {
    this.apiEndPoint='CommercialAirportSearch';
    this.bsConfig = { containerClass: 'theme-dark-blue', isAnimated: true }
    this.dateFormats = this.DFService.dateFormats;
    this.form.BeginDate = new Date();
    this.form.BeginDate.setDate(this.form.BeginDate.getDate());
    this.form.EndDate = new Date();
    this.form.EndDate.setDate(this.form.EndDate.getDate()+1);
  }

  ngOnInit(): void {
    this.StartBooking();
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $("ng-autocomplete input[type='text']").on('blur', (event) => {
        //console.log($(event.target).parents('ng-autocomplete')) //.attr('name'));
        this.selectDefaultValue($(event.target).parents('ng-autocomplete').attr('name'));
      });
    });
  }

  onFocused(e){
    // do something when input is focused
  }
  setDateTo () {
    var BeginDate = new Date(this.form.BeginDate);
    this.minDateTo.setDate(BeginDate.getDate()+1);
  }

  applyFormat (dp) {
    this.bsConfig = Object.assign(this.bsConfig, { dateInputFormat: this.chosenDateFormat });
  }

  submitIt () {
    let _form = Object.assign({}, this.form);
    let departure = new Date(_form.BeginDate);
    _form.BeginDate = departure.getFullYear()+'-'+departure.getMonth()+"-"+departure.getDate();
    let arrival = new Date(_form.EndDate);
    _form.EndDate = arrival.getFullYear()+'-'+arrival.getMonth()+"-"+arrival.getDate();
    this._http._post("Booking/"+this.form.bookingID+"/SearchCriteria", _form)
      .subscribe(data => {
        this.router.navigate(['/result-list']);
      });
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

  selectTraveler ($event) {

  }

  getloadProfiles (event) {
    let params = {searchTerm: event};
    params['criteria'] = this.profileTypeSelected;
    this.travelerList =[];
    this.isLoadingTraveler =true;
    this._http._get("lookup/ProfileLookupSearch", params)
      .subscribe(data => {
          this.defaultSelection = data['data']['defaultValue'];
          this.travelerList = data['data']['results'];
          this.isLoadingTraveler = false;

      },error => {
        this.error = error;
        this.isLoadingTraveler = false;
      });
  }

  selectDefaultValue (fieldName) {
    if(!fieldName || !this.defaultSelection) return;
    let remoteContent = [];
    if(fieldName == 'traveler') { remoteContent = Object.assign([], this.travelerList); }
    if(fieldName == 'departure') { remoteContent = Object.assign([], this.departureList);}
    if(fieldName == 'arrival') { remoteContent = Object.assign([], this.arrivalList);}
    console.log(fieldName, this.defaultSelection, remoteContent);

    for(let index = 0; index < remoteContent.length; index++) {
      if(this.defaultSelection == remoteContent[index].value) {
        //this.selectedObject = remoteContent[index];
        if(fieldName == 'traveler') {  }
        if(fieldName == 'departure') { this.selectDeparture(remoteContent[index]);}
        if(fieldName == 'arrival') { this.selectArrival(remoteContent[index]);}
        break;
      }
    }
  }

  selectEvent(item) {
    // do something with selected item
    this.selectedObject = item;
  }

  selectDeparture (item) {
    let selection = {};
    selection['Type'] = this.getLocationType();
    selection["Selection"]= item.value;
    selection["SelectionText"] =  item.text;
    switch (this.form.tripType) {
      case 1:
        selection["Relation"] = "DepartureAirport"
        this.form.SelectedItems[0] = selection;
        break;
      case 2:
        selection["Relation"] = "DepartureAirport"
        this.form.SelectedItems[0] = selection;
        break;
      case 3:
        break;
      default:
        this.form.SelectedItems.push(selection);
        break;
    }
  }

  getLocationType () {
    let type = 0;
    switch (this.tab) {
      case 'flight':
        type = 1;
        break;
      default:
        break;
    }
    return type;
  }

  selectArrival (item) {
    let selection = {};
    selection['Type'] = this.getLocationType();
    selection["Selection"]= item.value;
    selection["SelectionText"] =  item.text;
    switch (this.form.tripType) {
      case 1:
        selection["Relation"] = "ArrivalAirport"
        this.form.SelectedItems[1] = selection;
        break;
      case 2:
        selection["Relation"] = "ArrivalAirport"
        this.form.SelectedItems[1] = selection;
        break;
      case 3:
        break;
      default:
        this.form.SelectedItems.push(selection);
        break;
    }
  }

  searchCleared() {
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

  StartBooking () {
    this.state.initiateBooking=true;
    this._http._get("Booking/Start")
      .subscribe(data => {
        console.log(data);
        this.ruleBags = data['ruleBags'];
        this.form.bookingID = data['bookingID'];
        this.state.initiateBooking = false;
      });
  }

  loadBusinessProfiles () {
    //https://demo.innfinity.com/productsdemo/api2/lookup/ProfileTypeLookupSearch
      this._http._get("lookup/ProfileTypeLookupSearch")
        .subscribe(data => {
          this.businessProfiles = data['data']['results'];
        });
  }
}
