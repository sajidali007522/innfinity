import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
declare var $:JQueryStatic;
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
  date = new Date();
  form = {
    site: '',
    endDate: new Date(),
    beginDate: new Date(this.date.getFullYear(), this.date.getMonth(), 1),
    blockDate: new Date(),
    days: []
  };
  //multiple features in reservations and tape grid
  reservations= [
    { feature: "feature 1", name: "test 1", dates: ["2020-07-08", "2020-07-08","2020-07-09", "2020-07-10"], "reservationDate": "2020-07-04" },
    { feature: "feature 1", name: "test 2",dates: ["2020-07-22", "2020-07-23","2020-07-24", "2020-07-25"], "reservationDate": "2020-07-04" },
    { feature: "feature 3", name: "test 3", dates: ["2020-07-11", "2020-07-12","2020-07-13", "2020-07-14"], "reservationDate": "2020-07-04" },
    { feature: "feature 1", name: "test 4", dates: ["2020-07-14", "2020-07-15","2020-07-16", "2020-07-17"], "reservationDate": "2020-07-04" },
    { feature: "feature 3", name: "test 5", dates: ["2020-07-25", "2020-07-26","2020-07-27", "2020-07-28"], "reservationDate": "2020-07-04" },
    { feature: "feature 1", name: "test 6", dates: ["2020-07-24", "2020-07-25","2020-07-11", "2020-07-10"], "reservationDate": "2020-07-04" },
    { feature: "feature 2", name: "test 7", dates: ["2020-07-03", "2020-07-04","2020-07-05", "2020-07-06"], "reservationDate": "2020-07-04" }
  ];

  tapeGrid = [
    {room_no: '1-101', feature: "feature 1", reservations: [
      {occupiedBy: 'John', date: "2020-07-01"},
      {occupiedBy: 'John', date: "2020-07-02"},
      {occupiedBy: 'John', date: "2020-07-03"},
      {occupiedBy: 'John', date: "2020-07-04"},
      {occupiedBy: 'John', date: "2020-07-05"}
      ]
    },
    {room_no: '1-102', feature: "feature 1", reservations: [
        {occupiedBy: 'Smith', date: "2020-07-03"},
        {occupiedBy: 'Smith', date: "2020-07-04"},
        {occupiedBy: 'Smith', date: "2020-07-05"},
        {occupiedBy: 'Smith', date: "2020-07-06"}
      ] },
    {room_no: '1-103', feature: "feature 2", reservations: [
        {occupiedBy: 'Ross', date: "2020-07-05"},
        {occupiedBy: 'Ross', date: "2020-07-06"},
        {occupiedBy: 'Ross', date: "2020-07-07"},
        {occupiedBy: 'Cleaning', date: "2020-07-12"},
        {occupiedBy: 'Cleaning', date: "2020-07-13"},
        {occupiedBy: 'Cleaning', date: "2020-07-14"}
      ]},
    {room_no: '1-111', feature: "feature-1", reservations:[
        {occupiedBy: 'joye', date: "2020-07-16"},
        {occupiedBy: 'joye', date: "2020-07-17"},
        {occupiedBy: 'joye', date: "2020-07-12"},
        {occupiedBy: 'joye', date: "2020-07-13"},
        {occupiedBy: 'joye', date: "2020-07-14"}
      ]},
    {room_no: '1-105', feature: "feature 3", reservations:[
        {occupiedBy: 'Tom', date: "2020-07-13"},
        {occupiedBy: 'To', date: "2020-07-14"},
        {occupiedBy: 'Tom', date: "2020-07-15"},
        {occupiedBy: 'Tom', date: "2020-07-16"},
        {occupiedBy: 'Tom', date: "2020-07-17"}
      ]},
    {room_no: '1-106', feature: "feature 2", reservations:[
        {occupiedBy: 'joye', date: "2020-07-10"},
        {occupiedBy: 'joye', date: "2020-07-11"},
        {occupiedBy: 'joye', date: "2020-07-12"}
      ]},
    {room_no: '1-107', feature: "feature 1", reservations:[
        {occupiedBy: 'joye', date: "2020-07-16"},
        {occupiedBy: 'joye', date: "2020-07-17"},
        {occupiedBy: 'joye', date: "2020-07-12"},
        {occupiedBy: 'joye', date: "2020-07-13"},
        {occupiedBy: 'joye', date: "2020-07-14"}
      ]},
    {room_no: '1-108', feature: "feature 1", reservations:[
        {occupiedBy: 'joye', date: "2020-07-03"},
        {occupiedBy: 'joye', date: "2020-07-04"},
        {occupiedBy: 'Monica', date: "2020-07-12"},
        {occupiedBy: 'Monica', date: "2020-07-13"},
        {occupiedBy: 'Monica', date: "2020-07-14"}
      ]},
    {room_no: '1-109', feature: "feature 1", reservations:[
        {occupiedBy: 'Chandler', date: "2020-07-05"},
        {occupiedBy: 'Chandler', date: "2020-07-06"},
        {occupiedBy: 'joye', date: "2020-07-22"},
        {occupiedBy: 'joye', date: "2020-07-23"},
        {occupiedBy: 'joye', date: "2020-07-24"}
      ]},
    {room_no: '1-110', feature: "feature 2", reservations:[
        {occupiedBy: 'joye', date: "2020-07-16"},
        {occupiedBy: 'joye', date: "2020-07-17"},
        {occupiedBy: 'joye', date: "2020-07-12"},
        {occupiedBy: 'joye', date: "2020-07-13"},
        {occupiedBy: 'joye', date: "2020-07-14"}
      ]},
  ];
  associatedTo=[];
  ngOnInit(): void {
    for (let i=1; i <= this.tapeGrid.length; i++) {
      this.associatedTo.push("tape_grid_"+i);
    }
    this.loadContent();
    this.parseRoomObject();
  }
  ngOnDestroy() {
  }

  drop(event: CdkDragDrop<string[]>, tape) {
    tape.statusClass = '';
    if(!this.checkingOnDrop(event.previousContainer.data[event.previousIndex], tape.reservations)) return;
    //this.tapeGrid[event.currentIndex].startDate = event.previousContainer.data.startDate;
    //this.tapeGrid[event.currentIndex].endDate = event.previousContainer.data.endDate;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(tape);
      //console.log(event.previousContainer.data[event.previousIndex], event.container.data[event.currentIndex])
      /*transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);*/
      //console.log(event.previousContainer, event.container, event.previousIndex, event.currentIndex);
      event.previousContainer.data[event.previousIndex]['dates'].filter(function (date){
        let row = {
          occupiedBy: event.previousContainer.data[event.previousIndex]['name'],
          date: date
        }
        tape.reservations.push(row);
      })
      tape.bookings = this.mapBookingDates(tape);
      //event.container.data.push(event.previousContainer.data[event.previousIndex]);
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

  parseRoomObject() {
    for (let i =0; i < this.tapeGrid.length; i++) {
      this.tapeGrid[i]['bookings'] = this.mapBookingDates(this.tapeGrid[i]);
    }
  }

  mapBookingDates (tape) {
    return tape.reservations.map(res => res.date);
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
  //check if dates are available
  areDatesAvailable (reservation, targetRoom) {
    let datesAvailable = true;
    reservation.filter(function (res) {
      if(datesAvailable) {
        datesAvailable = !(targetRoom.dates.indexOf(res.date) !== -1)
      }
    });
    return datesAvailable;
  }

  checkingOnDrop (item, tape) {
    let isAllowed=true;
    let datesAvailable = true;
    tape.filter(function (res) {
      if(datesAvailable) {
        datesAvailable = !(item.dates.indexOf(res.date) !== -1)
      }
    });
    if (datesAvailable) { isAllowed = false; }
    return isAllowed;
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  ReservationCheck(item: CdkDrag<any>, tape: CdkDropList<any>) {
    let isAllowed=true;
    $("#"+tape.element.nativeElement.id).addClass("active");
    console.log($("tr#"+tape.element.nativeElement.id+" > td:nth-child(2)").text(), ' != ', item.data.feature);
    console.log($("tr#"+tape.element.nativeElement.id+" > td:nth-child(2)").text() != item.data.feature);
    if($("tr#"+tape.element.nativeElement.id+" > td:nth-child(2)").text() != item.data.feature) {
      $("#"+tape.element.nativeElement.id).addClass("warning");
    }
    let datesAvailable = true;
    tape.data.filter(function (res) {
      if(datesAvailable) {
        datesAvailable = !(item.data.dates.indexOf(res.date) !== -1)
      }
    });
    if (datesAvailable) {
    //if(this.areDatesAvailable(tape.data, item.data)){
      isAllowed = false;
      $("#"+tape.element.nativeElement.id).addClass("danger");
    }
    console.log(tape, isAllowed)
    return isAllowed;
  }
  resetRow ($event, tape){
    console.log($event, tape);
    $("#"+$event.fromElement.id).removeClass('warning')
    $("#"+$event.fromElement.id).removeClass('danger')
    $("#"+$event.fromElement.id).removeClass('active')
  }

  isOccupied (tape, currDay) {
    //console.log(tape.bookings);
    let date = currDay.value.getFullYear()+'-'+(currDay.value.getMonth()+1).toString().padStart(2, "0")+'-'+currDay.value.getDate().toString().padStart(2, "0");
    //console.log(tape.bookings, date, tape.bookings.indexOf(date));
    return tape.bookings.indexOf(date) != -1;
  }
}
