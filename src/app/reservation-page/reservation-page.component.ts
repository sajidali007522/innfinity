import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Options } from 'ng5-slider';
import * as $ from 'jquery';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit, AfterViewInit {
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  state= {
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
  constructor() {
    console.log("inside page reservation page")
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    $(".accordon-heading").click(function(){
      $(this).parent().toggleClass('group-active');
    })
  }

}
