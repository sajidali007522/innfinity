import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HouseKeeping} from "../interfaces/HouseKeeping";
import {Shift} from "../interfaces/Shift";
import {HsStatus} from "../interfaces/HsStatus";
import {HouseKeeper} from "../interfaces/HouseKeeper";
import {AdminStatus} from "../interfaces/AdminStatus";

const HOUSEKEEEPING: HouseKeeping[] = [
  {
    room_no: '1',
    features: 'feature 1',
    fd_status: true,
    hs_status: 1,
    admin_status: 1,
    housekeeper: 1,
    shift: 1,
    linen_status: false,
    viewMode: true
  },
  {
    room_no: '2',
    features: 'feature 2',
    fd_status: true,
    hs_status: 2,
    admin_status: 1,
    housekeeper: 2,
    shift: 2,
    linen_status: false,
    viewMode: true
  },
  {
    room_no: '3',
    features: 'feature 3',
    fd_status: true,
    hs_status: 3,
    admin_status: 1,
    housekeeper: 2,
    shift: 2,
    linen_status: false,
    viewMode: true
  },
];
const SHIFTS: Shift [] = [
  {id: 1, title: "Day"},
  {id: 2, title: "TimeOut"},
  {id: 3, title: "Night"},
];
const HSSTATUS: HsStatus[] = [
  {id: 1, title: 'Occupied/Clean'},
  {id: 2, title: 'Vacant/Clean'},
  {id: 3, title: 'Dirty'},
];
const HOUSEKEEPERS: HouseKeeper[]=[
  {id: 1, name: 'House Keeper 1'},
  {id: 2, name: 'House Keeper 2'},
  {id: 3, name: 'House Keeper 3'},
  {id: 4, name: 'House Keeper 4'},
  {id: 5, name: 'House Keeper 5'},
];

const ADMINSTATUS: AdminStatus[]=[
  {id: 1, title: 'Available'},
  {id: 2, title: 'Not Available'},
]

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-house-keeping',
  templateUrl: './house-keeping.component.html',
  styleUrls: ['./house-keeping.component.css']
})
export class HouseKeepingComponent implements OnInit {

  data;
  houseKeepers;
  shifts;
  hsStatus;
  adminStatuses;

  textFormattedObjects={};
  dtOptions: DataTables.Settings = {};
  constructor() {
    this.data = Array.from(HOUSEKEEEPING);
    this.houseKeepers=Array.from(HOUSEKEEPERS);
    this.shifts = Array.from(SHIFTS);
    this.hsStatus = Array.from(HSSTATUS);
    this.adminStatuses = Array.from(ADMINSTATUS);

    //
    this.formatHouseKeepers();
    this.formatHsStatus();
    this.formatShift();
    this.formatAdminStatuses();
  }

  ngOnInit(): void {
  }

  formatHouseKeepers () {
    let obj ={};
    for(let i=0; i<this.houseKeepers.length; i++) {
      obj[this.houseKeepers[i].id] =this.houseKeepers[i].name;
    }
    this.textFormattedObjects['house_keepers'] = obj;
  }

  formatHsStatus () {
    let obj ={};
    for(let i=0; i < this.hsStatus.length; i++) {
      obj[this.hsStatus[i].id] =this.hsStatus[i].title;
    }
    this.textFormattedObjects['hs_status'] = obj;
  }

  formatShift () {
    let obj ={};
    for(let i=0; i < this.shifts.length; i++) {
      obj[this.shifts[i].id] =this.shifts[i].title;
    }
    this.textFormattedObjects['shifts'] = obj;
  }

  formatAdminStatuses () {
    let obj ={};
    for(let i=0; i < this.adminStatuses.length; i++) {
      obj[this.adminStatuses[i].id] =this.adminStatuses[i].title;
    }
    this.textFormattedObjects['admin_statuses'] = obj;
  }

  initValue (obj, key, value) {
    obj[key] = value
  }

  toggleProperty (obj, key) {
    obj[key] = !obj[key];
    console.log("clicked....",obj);
  }
}
