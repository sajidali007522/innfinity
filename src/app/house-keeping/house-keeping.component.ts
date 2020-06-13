import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Shift} from "../interfaces/Shift";
import {HouseKeepingService} from "../_services/house-keeping.service";
import {RoomsService} from "../_services/rooms.service";

const SHIFTS: Shift [] = [
  {value: 1, text: "Day"},
  {value: 2, text: "TimeOut"},
  {value: 3, text: "Night"},
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-house-keeping',
  templateUrl: './house-keeping.component.html',
  styleUrls: ['./house-keeping.component.css']
})
export class HouseKeepingComponent implements OnInit {

  data;
  pageFilters= {
    isHousekeeperAdmin: true,
    sites:'',
    features: '00000000-0000-0000-0000-000000000000',
    housekeepingStatuses: '',
    adminStatuses: '',
    housekeepers: ''
  }
  state = {
    isLoading: false,
    filterConfigs: {
      sites: [],
      houseKeepers: [],
      features: [],
      shifts: [],
      hsStatus: [],
      adminStatuses: [],
    }
  }
  textFormattedObjects={};
  dtOptions: DataTables.Settings = {};
  constructor (private HKService: HouseKeepingService,
               private roomService: RoomsService,
               private ref: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.state.isLoading = true;
    this.HKService.loadInitialConfig().subscribe(data => {

        this.pageFilters.isHousekeeperAdmin = data['isHousekeeperAdmin'];
        this.state.filterConfigs.shifts = SHIFTS;
        this.state.filterConfigs.sites = data['sites'];
        this.state.filterConfigs.houseKeepers = data['housekeepers'];
        this.state.filterConfigs.features = data['features'];
        this.state.filterConfigs.hsStatus = data['housekeepingStatuses'];
        this.state.filterConfigs.adminStatuses = data['adminStatuses'];
        this.pageFilters.sites = data['sites'][0]['value'];
        this.state.isLoading=false;
        this.ref.detectChanges();
        //this.loadRooms();
      },
      err => {
        //handle errors here
        console.log(err);
        this.state.isLoading = false;
      });
  }

  public reloadConfigs () {
    this.state.isLoading=true;
    this.ref.detectChanges();
    this.HKService.loadSiteconfig(this.pageFilters.sites, {featureId : this.pageFilters.features}).subscribe(data => {
        this.state.filterConfigs.shifts = SHIFTS;
        this.state.filterConfigs.houseKeepers = data['housekeepers'];
        this.state.filterConfigs.features = data['features'];
        this.state.filterConfigs.hsStatus = data['housekeepingStatuses'];
        this.state.filterConfigs.adminStatuses = data['adminStatuses'];
        this.pageFilters.features =  '00000000-0000-0000-0000-000000000000';
        this.state.isLoading = false;
        this.ref.detectChanges();
        this.loadRooms();
      },
      err => {
        //handle errors here
        console.log(err);
        this.state.isLoading = false;
      });
  }

  public loadRooms () {
    this.state.isLoading = true;
    this.ref.detectChanges();
    this.roomService.loadRooms(this.pageFilters.sites, {featureId : this.pageFilters.features}).subscribe(data => {
        console.log("processed")
        this.data = data;
        this.state.isLoading = false;
        this.ref.detectChanges();
      },
      err => {
        //handle errors here
        console.log(err);
        this.state.isLoading = false;
      });
  }

  public updateHouseKeeping(roomId, roomRow, key, editKey) {
    console.log(roomId, roomRow, key, editKey);
    roomRow[editKey] = false;
  }

  public enableEditMode (row, key, ele) {
    console.log(ele);
    row[key] = true;
    $("#"+ele).trigger('mousedown');
  }

  public initValue (obj, key, value) {
    obj[key] = value
  }

  public toggleProperty (obj, key) {
    obj[key] = !obj[key];
    console.log("clicked....",obj);
  }
}
