import { Component, OnInit, Renderer2 } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {DateFormatsService} from "../../_services/date-formats.service";
import { ImageCroppedEvent } from 'ngx-image-cropper';

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
}, {
  type: 'info',
  message: 'This is an info alert',
}, {
  type: 'warning',
  message: 'This is a warning alert',
}, {
  type: 'danger',
  message: 'This is a danger alert',
}, {
  type: 'primary',
  message: 'This is a primary alert',
}, {
  type: 'secondary',
  message: 'This is a secondary alert',
}, {
  type: 'light',
  message: 'This is a light alert',
}, {
  type: 'dark',
  message: 'This is a dark alert',
}
];

@Component({
  selector: 'app-html-elements',
  templateUrl: './html-elements.component.html',
  styleUrls: ['./html-elements.component.css']
})

export class HtmlElementsComponent implements OnInit {
  public data = [
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com'},
  ];

  mytime;
  title = 'Angular Datatables';
  dtOptions: DataTables.Settings = {};
  alerts: Alert[];

  dateModel: NgbDateStruct;
  date: {year: number, month: number};
  bsConfig: Partial<BsDatepickerConfig>;
  chosenDateFormat;
  dateFormats;
  constructor(private calendar: NgbCalendar, private renderer: Renderer2, private DFService: DateFormatsService) {
    this.reset();
    this.bsConfig = { containerClass: 'theme-dark-blue', isAnimated: true }
    this.dateFormats = this.DFService.dateFormats;
    //this.addJsToElement('assets/js/datepicker-lib.js');
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }
  }
  selectToday() {
    this.dateModel = this.calendar.getToday();
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  applyFormat (dp) {
    this.bsConfig = Object.assign(this.bsConfig, { dateInputFormat: this.chosenDateFormat });
  }
  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log("image cropped");
  }
  imageLoaded() {
    console.log("image has loaded")
  }
  cropperReady() {
    // cropper ready
    console.log("CRopper ready")
  }
  loadImageFailed() {
    // show message
    console.log("image loading failed")
  }

  doneWithCrop () {
    this.imageChangedEvent = null;
  }

}
