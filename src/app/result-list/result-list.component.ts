import {Component, OnInit, Renderer2} from '@angular/core';
import {Options} from "ng5-slider";
import {HttpService} from "../http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  state= {
    bookingID: '',
    searchId: '',
    processing: false,
    price : {
      value: 40,
      highValue: 60,
      options: {
        floor: 0,
        ceil: 100
      }
    },
    arrival: {
      value: 12,
      highValue: 18,
      options: {
        floor: 0,
        ceil: 24
      }
    },
    departure: {
      value: 12,
      highValue: 18,
      options: {
        floor: 0,
        ceil: 24
      }
    },
    stops: {
      value: 12,
      highValue: 18,
      options: {
        floor: 0,
        ceil: 24
      }
    }
  }

  constructor( private renderer: Renderer2,
               private _http: HttpService,
               private activatedRoute: ActivatedRoute
  ) {
    this.renderer.addClass(document.body, 'menu-fullwidth');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.state.bookingID = params["booking_id"];
      this.state.searchId = params['search_id'];
    });
    console.log(this.state.bookingID, this.state.searchId )
    this.checkSearchStatus();
  }

  checkSearchStatus () {
    this.state.processing = true;
    this._http._get('booking/'+this.state.bookingID+'/Search/'+this.state.searchId, {})
      .subscribe(data => {
        if(data['isCompleted']) {
          this.state.processing = false;
          this.getSortFields();
        } else {
          this.checkSearchStatus();
        }
      })
  }

  getSortFields () {
    // /api2/booking/{bookingID}/GetSearchSortFields/{searchID}/{searchIndex}
    this.state.processing=true;
    this._http._get('booking/'+this.state.bookingID+'/GetSearchSortFields/'+this.state.searchId+'/0', {})
      .subscribe(data => {
        this.state.processing=false;
        this.getSearchResults();
      },
        error => {
        this.state.processing = false;
        console.log(error);
        });
  }

  getSearchResults () {
    // /api2/booking/{bookingID}/SearchResults/{searchID}
    this.state.processing=true;
    this._http._get('booking/'+this.state.bookingID+'/SearchResults/'+this.state.searchId+'', {
      searchIndex:0,
      sortProperties:'LowestPrice',
      isAscending: true,
      bookingItemProperties: 'BeginDate|EndDate|From|FromName|To|ToName|ProviderName|UniqueID|ProviderLogo|ConnectionDescriptionExtended|FullConnectionDescription|SegmentCount',
      priceProperties: 'TotalPrice|UniqueID|GetFareNameShort|BasePrice',
      tripProperties: 'BeginDate|EndDate|From|FromName|To|ToName'
    })
      .subscribe(data => {
        this.state.processing=false;
      },
        error => {
        this.state.processing = false;
        console.log(error);
        })
  }

}
