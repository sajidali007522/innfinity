import { Component, OnInit } from '@angular/core';
import {Options} from "ng5-slider";

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
  constructor() { }

  ngOnInit(): void {
  }

}
