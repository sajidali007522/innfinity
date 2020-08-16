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
    resourceTypeID: '',
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
      this.state.resourceTypeID = params['resource_type_id'];
    });
    console.log(this.state.bookingID, this.state.resourceTypeID )
    this.state.processing=true;
    this._http._post('Booking/'+this.state.bookingID+'/SearchCriteria', Array.of({}), {
          retrieve : true,
          resourceTypeID: this.state.resourceTypeID
        }
      )
      .subscribe(data => {
        this.state.processing=false;
        this.loadSearchResult(data);
      })
  }

  loadSearchResult (requestParams) {
    this.state.processing=true;
    let body = {
      "ResourceTypeID": this.state.resourceTypeID,
      "Criteria": [
        requestParams
      ]
    }
    this._http._post('Booking/'+this.state.bookingID+'/Search', body, {})
      .subscribe(data => {
        console.log(data);
      })
  }

}
