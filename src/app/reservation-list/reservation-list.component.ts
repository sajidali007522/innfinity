import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit, OnDestroy {
  bsConfig: Partial<BsDatepickerConfig>;
  Arr = Array;
  constructor() {
    this.bsConfig = { containerClass: 'theme-dark-blue', isAnimated: true, dateInputFormat: "YYYY-MM-DD" }
  }
  day = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ]
  form = {
    site: '',
    endDate: new Date(),
    beginDate: new Date(),
    blockDate: new Date(),
    days: []
  };

  reservations= [
    { name: "test 1", "startDate": "2020-07-05", "endDate": "2020-07-12", "reservationDate": "2020-07-04" },
    { name: "test 2", "startDate": "2020-07-06", "endDate": "2020-07-11", "reservationDate": "2020-07-04" },
    { name: "test 3", "startDate": "2020-07-07", "endDate": "2020-07-09", "reservationDate": "2020-07-04" },
    // { name: "test 4", "startDate": "2020-07-08", "EndDate": "2020-07-14", "reservationDate": "2020-07-04" },
    // { name: "test 5", "startDate": "2020-07-09", "EndDate": "2020-07-15", "reservationDate": "2020-07-04" },
    // { name: "test 6", "startDate": "2020-07-10", "EndDate": "2020-07-16", "reservationDate": "2020-07-04" },
    // { name: "test 7", "startDate": "2020-07-11", "EndDate": "2020-07-17", "reservationDate": "2020-07-04" }
  ];

  tapeGrid = [
    {room_no: '1-101', feature: "feature 1", reservations: [ {name: "test 1", startDate: "2020-07-01", endDate: "2020-07-05"}] },
    {room_no: '1-102', feature: "feature 2", reservations: [ {name: "test 2", startDate: "2020-07-02", endDate: "2020-07-05"}] },
    {room_no: '1-103', feature: "feature 3", reservations: []},
    // {room_no: '1-104', feature: "feature 4", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-105', feature: "feature 5", StartDate: "2020-07-05", endDate: "2020-07-25"},
    // {room_no: '1-106', feature: "feature 6", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-107', feature: "feature 7", StartDate: "", endDate: ""},
    // {room_no: '1-108', feature: "feature 8", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-109', feature: "feature 9", StartDate: "", endDate: ""},
    // {room_no: '1-110', feature: "feature 10", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-111', feature: "feature 11", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-112', feature: "feature 12", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-113', feature: "feature 13", StartDate: "", endDate: ""},
    // {room_no: '1-114', feature: "feature 14", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-115', feature: "feature 15", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-116', feature: "feature 16", StartDate: "", endDate: ""},
    // {room_no: '1-117', feature: "feature 17", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-118', feature: "feature 18", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '2-102', feature: "feature 19", StartDate: "", endDate: "2020-07-05"},
    // {room_no: '1-103', feature: "feature 20", StartDate: "2020-07-01", endDate: "2020-07-05"},
    // {room_no: '1-104', feature: "feature 21", StartDate: "", endDate: ""}
  ];
  associatedTo=[];
  ngOnInit(): void {
    for (let i=1; i <= this.tapeGrid.length; i++) {
      this.associatedTo.push("tape_grid_"+i);
    }
    this.loadContent();
  }
  ngOnDestroy() {
  }

  drop(event: CdkDragDrop<string[]>) {
    //this.tapeGrid[event.currentIndex].startDate = event.previousContainer.data.startDate;
    //this.tapeGrid[event.currentIndex].endDate = event.previousContainer.data.endDate;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //console.log(event.previousContainer.data[event.previousIndex], event.container.data[event.currentIndex])
      /*transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);*/
      //console.log(event.previousContainer, event.container, event.previousIndex, event.currentIndex);
      event.container.data.push(event.previousContainer.data[event.previousIndex]);
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }
  onItemDrop(e: any) {
    // Get the dropped data here
    //this.droppedItems.push(e.dragData);
  }

  updateCell (e: any, item, index) {
    console.log(item, index, e.dragData)
    item.cells[index] = e.dragData;
  }

  loadContent(){
    console.log(this.form)
    if(this.form.beginDate && this.form.endDate) {
      this.form.days = [];
      let entryDate = new Date(this.form.beginDate);
      while (entryDate <= this.form.endDate) {
        this.form.days.push({label: (entryDate.getMonth()+1)+'/'+(entryDate.getDate())+ ' '+this.day[entryDate.getDay()], value: new Date(entryDate)})
        entryDate.setDate(entryDate.getDate()+1);
      }
    }
  }

  isOccupied (tape, currDay) {
    let isOccupied = false;
    tape.reservations.filter(function (res) {
      // console.log(new Date(res.startDate), '<=', currDay.value, '&&', new Date(res.endDate), '>=', currDay.value)
      // console.log(new Date(res.startDate) <= new Date(currDay.value), '&&', new Date(res.endDate) >= currDay.value, '=', new Date(res.startDate) <= currDay.value && new Date(res.endDate) >= currDay.value)
      if(new Date(res.startDate).setHours(0, 0, 0, 0) <= currDay.value.setHours(0, 0, 0, 0) && new Date(res.endDate).setHours(0, 0 ,0, 0 ) >= currDay.value.setHours (0,0,0,0)) {
        isOccupied=true;
      }
    })
    return isOccupied
  }

}
