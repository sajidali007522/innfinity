import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {DateFormatsService} from "../_services/date-formats.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

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
  constructor(private DFService: DateFormatsService) {
    this.bsConfig = { containerClass: 'theme-dark-blue', isAnimated: true }
    this.dateFormats = this.DFService.dateFormats;
    this.minDateFrom = new Date();
    this.minDateFrom.setDate(this.minDateFrom.getDate());
    this.minDateTo = new Date();
    this.minDateTo.setDate(this.minDateFrom.getDate()+1);
  }

  ngOnInit(): void {
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
}
