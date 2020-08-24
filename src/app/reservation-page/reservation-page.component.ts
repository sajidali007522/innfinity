import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import { Options } from 'ng5-slider';
import * as $ from 'jquery';
import {HttpService} from "../http.service";
import {ActivatedRoute} from "@angular/router";

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
    bookingContentArea: false,
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
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    $(".accordon-heading").click(function(){
      $(this).parent().toggleClass('group-active');
    });
    $(document).on("click", '.display-detail', function(){
      $(this).parents('.article-content-booking').find('.more-reservation-wrap').slideToggle();
    });
    $(".content-booking-wrapper").on("click", ".content-booking-right td a", function(){
      $(this).parent('td').toggleClass('active');
      $(document).find(".booking-article-bot a").removeClass('shakeClass');
      $(document).find(".booking-article-bot a span").hide();
      if($(document).find("table.table-price-tickets tr td.active").length > 0) {
        $(document).find(".booking-article-bot a span").show();
      }
      $(document).find(".booking-article-bot a span").text($(document).find("table.table-price-tickets tr td.active").length)
      $(document).find(".booking-article-bot a").addClass("shakeClass");
    })
  }

  toggleBookingContentArea (state) {
    this.state.bookingContentArea = state;
  }

}
