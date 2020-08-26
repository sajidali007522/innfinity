import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LabelType, Options} from "ng5-slider";
import {HttpService} from "../http.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit,AfterViewInit {
  @ViewChild('policyListFilter') policyListFilter;
  @ViewChild('airlineListFilter') airlineListFilter;
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  state= {
    bookingContentArea: false,
    bookingID: '',
    searchId: '',
    grid_filter: '',
    processing: false,
    cart: [],
    metaDataGridOptions: [],
    bookingRows: [],
    gridFilter: {
      totalResults: 0,
      rows: [],
      columns: []
    },
    price : {
      options: {
        floor: 0,
        ceil: 100
      }
    },
    arrival: {
      options: {
        floor: 0,
        ceil: 24
      }
    },
    departure: {
      options: {
        floor: 0,
        ceil: 24
      }
    },
    maxStoptime: {
      options: {
        floor: 0,
        ceil: 24
      }
    },
    filter:{
      price : {
        value: 40,
        highValue: 60
      },
      arrival: {
        value: 12,
        highValue: 18
      },
      departure: {
        value: 12,
        highValue: 18
      },
      maxStoptime: {
        value: 12,
        highValue: 18
      },
      policy:[],
      airlines:[],
      stops:[],
      channel: [],
      options: [],
      connectingCity: [],
      fareType: []
    }
  }

  constructor( private renderer: Renderer2,
               private _http: HttpService,
               private activatedRoute: ActivatedRoute
  ) {
    this.renderer.removeClass(document.body, 'menu-fullwidth');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.state.bookingID = params["booking_id"];
      this.state.searchId = params['search_id'];
    });
    console.log(this.state.bookingID, this.state.searchId )
    this.checkSearchStatus();
  }

  ngAfterViewInit() {
    $("body").on("click", ".accordon-heading", function(){
      $(this).parent().toggleClass('group-active');
    });
    $(document).on("click", '.display-detail', function(){
      $(this).parents('.article-content-booking').find('.more-reservation-wrap').slideToggle();
    });
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

  selectIt (bookRow, bookIndex, currentItem, priceArray) {
    let check = currentItem.values2.$selected;
    $(document).find(".booking-article-bot > a").removeClass('shakeClass');
    priceArray.filter(function(price){
      price.values2.$selected = false;
    });

    if(!check) {
      let index =0;
      let removeMe = -1;
      this.state.cart.filter(function(c){
        if(c.UniqueID == bookRow.UniqueID){
          removeMe = index;
        }
        index++;
      });
      if(removeMe>= 0) {
        this.state.cart.splice(removeMe, 1);
      }

      this.state.cart.push({
        UniqueID: bookRow.UniqueID,
        provider: bookRow.ProviderName,
        Date: this.getDateFromDateTime(bookRow.BeginDate),
        From: this.formatDateIntoTime(bookRow.BeginDate)+": "+bookRow.From,
        To: this.formatDateIntoTime(bookRow.EndDate)+": "+bookRow.To,
        Price: currentItem
      });
      currentItem.values2.$selected = true;
    } else {
      let index =0;
      let removeMe = -1;
      this.state.cart.filter(function(c){
        if(c.UniqueID == bookRow.UniqueID){
          removeMe = index;
        }
        index++;
      });

      this.state.cart.splice(removeMe, 1);
      currentItem.values2.$selected = false;
    }
    $(document).find(".booking-article-bot > a").addClass('shakeClass');
  }

  removeItemFromCart(UniqueId, index) {
    $(document).find(".booking-article-bot > a").removeClass('shakeClass');
    this.state.bookingRows.filter(row => {
      //console.log(row.values2.UniqueID == UniqueId, row.values2.UniqueID, '==', UniqueId)
      if(row.values2.UniqueID == UniqueId) {
        row.bookingChannels = this.resetBookingChannels(row.bookingChannels);
      }
    });
    this.state.cart.splice(index, 1);
    $(document).find(".booking-article-bot > a").addClass('shakeClass');
  }

  resetBookingChannels(bookingChannels){
    bookingChannels.filter(function(channel){
      channel.prices.filter(function( p ){
        p.values2.$selected = false;
      })
    });
    return bookingChannels;
  }

  getSearchResults () {
    // /api2/booking/{bookingID}/SearchResults/{searchID}
    this.state.processing=true;
    this._http._get('booking/'+this.state.bookingID+'/SearchResults/'+this.state.searchId+'', {
      flattenValues: true,
      searchIndex:0,
      sortProperties:'LowestPrice',
      isAscending: true,
      bookingItemProperties: 'BeginDate|EndDate|From|FromName|To|ToName|ProviderName|UniqueID|ProviderLogo|ConnectionDescriptionExtended|FullConnectionDescription|SegmentCount',
      priceProperties: 'TotalPrice|UniqueID|GetFareNameShort|BasePrice',
      tripProperties: 'BeginDate|EndDate|From|FromName|To|ToName'
    })
      .subscribe(data => {
          //setting up data to render
          for (let index =0; index < data['metadata'].length; index++){
            //checking for price
            if(data['metadata'][index].name == 'Price') {
              this.state.filter.price.value = Number(data['metadata'][index]['metadataItems'][0].key);
              this.state.filter.price.highValue= Number(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key);
              this.state.price.options.floor = Number(data['metadata'][index]['metadataItems'][0].key);
              this.state.price.options.ceil = Number(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key);
              this.state.price.options['step'] = data['metadata'][index].interval;
              console.log(this.state.price);
            }
            //checking for Departure
            if(data['metadata'][index].name == "Departure") {
              this.state.filter.departure.value = Date.parse(data['metadata'][index]['metadataItems'][0].key);
              this.state.filter.departure.highValue= Date.parse(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key);
              this.state.departure.options.floor = Date.parse(data['metadata'][index]['metadataItems'][0].key);
              this.state.departure.options.ceil = Date.parse(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key)
              this.state.price.options['step'] = data['metadata'][index].interval;
              this.state.departure.options['translate'] = (value: number, label: LabelType): string => {
                return this.parseTime(value)
              }
            }
            //checking for arrival
            if(data['metadata'][index].name == "Arrival") {
              this.state.filter.arrival.value = Date.parse(data['metadata'][index]['metadataItems'][0].key);
              this.state.filter.arrival.highValue= Date.parse(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key);
              this.state.arrival.options.floor = Date.parse(data['metadata'][index]['metadataItems'][0].key);
              this.state.arrival.options.ceil = Date.parse(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key)
              this.state.price.options['step'] = data['metadata'][index].interval;
              this.state.arrival.options['translate'] = (value: number, label: LabelType): string => {
                return this.parseTime(value)
              }
            }
            //checking for Max Number of Stops
            if(data['metadata'][index].name == "Max Stop Time") {
              this.state.filter.maxStoptime.value = Number(data['metadata'][index]['metadataItems'][0].key) * data['metadata'][index].interval;
              this.state.filter.maxStoptime.highValue= Number(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key) * data['metadata'][index].interval;
              this.state.maxStoptime.options.floor = Number(data['metadata'][index]['metadataItems'][0].key) * data['metadata'][index].interval;
              this.state.maxStoptime.options.ceil = Number(data['metadata'][index]['metadataItems'][data['metadata'][index]['metadataItems'].length -1 ].key) * data['metadata'][index].interval;
              this.state.price.options['step'] = data['metadata'][index].interval;
              this.state.maxStoptime.options['translate'] = (value: number, label: LabelType): string => {
                if(value <= 0) {
                  return 'non stop';
                }
                let hour = Math.floor(value/60);
                let mins = value%60;
                return hour+" hours and "+mins+ "Minutes";
              }
            }
            //checking for Policy
            if(data['metadata'][index].name == "Policy") {
              this.state.filter.policy = this.renderMetaDataItems(data['metadata'][index], "checkbox");
            }
            //checking for Airlines
            if(data['metadata'][index].name == "Airlines") {
              this.state.filter.airlines = this.renderMetaDataItems(data['metadata'][index], 'checkbox');
            }
            //checking for Airlines
            if(data['metadata'][index].name == "Stops") {
              this.state.filter.stops = this.renderMetaDataItems(data['metadata'][index], 'checkbox');
            }
            //checking for Airlines
            if(data['metadata'][index].name == "Channel") {
              this.state.filter.channel = this.renderMetaDataItems(data['metadata'][index], 'checkbox');
            }
            //checking for Airlines
            if(data['metadata'][index].name == "Options") {
              this.state.filter.options = this.renderMetaDataItems(data['metadata'][index], 'checkbox');
            }
            //checking for Airlines
            if(data['metadata'][index].name ==  "Connecting City") {
              this.state.filter.connectingCity = this.renderMetaDataItems(data['metadata'][index], 'checkbox');
            }
            //checking for Airlines
            if(data['metadata'][index].name ==  "Fare Type") {
              this.state.filter.fareType = this.renderMetaDataItems(data['metadata'][index], 'checkbox');
            }
          }
          this.state.processing=false;
          this.state.metaDataGridOptions = data['metadataGridOptions'];
          this.state.grid_filter = data['metadataGridOptions'][0].value;
          this.state.bookingRows = data['results'];
          this.renderFilterGrid();
        },
        error => {
        this.state.processing = false;
        console.log(error);
        })
  }

  renderMetaDataItems (metaData, type) {
    var returnObj= [];
    if(type == 'checkbox') {
      // <li><label for="airCanada"><input type="checkbox" class="checkbox" id="airCanada"> Air Canada <span class="label-num">$294</span> </label></li>
      if(metaData.metadataItems.length > 0) {
        for (let i =0; i< metaData.metadataItems.length; i++) {
          returnObj.push({
            label: metaData.metadataItems[i].name,
            value: metaData.metadataItems[i].key,
            id: metaData.metadataItems[i].name.split(" ").join("_"),
            price: metaData.metadataItems[i].minPrice,
            checked: metaData.metadataItems[i].isSelected
          })
        }
      }
      return returnObj;
    }
  }

  renderFilterGrid () {
    this.state.processing=true;
    ///api2/booking/{bookingID}/SearchFilterGrid/{searchID}/{searchIndex}/{columnMetadataKey}/{rowMetadataKey}
    let filterOption = this.state.grid_filter.split("|");
    this._http._get('booking/'+this.state.bookingID+'/SearchFilterGrid/'+this.state.searchId+'/0/'+filterOption[0]+"/"+filterOption[1], {})
      .subscribe(data => {
        this.state.processing=false;
        this.state.gridFilter.rows = data['rows'];
        this.state.gridFilter.columns = data['columns'];
        this.state.gridFilter['totalResults'] = data['totalResults'];
      });
  }

  parseTime(miliseconds) {
    let d = new Date(miliseconds); // this will translate label to time stamp.
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minut = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minut + ' ' + ampm;
  }

  getDateFromDateTime (date) {
    let d = date.split(" ");
    return d[0];
  }

  formatDateIntoTime(date) {
    let d = date.split(" ");
    let hours = d[1].split(":");
    return hours[0]+":"+hours[1]+" "+d[2];
  }

  toggleBookingContentArea (state) {
    this.state.bookingContentArea = state;
  }

}
