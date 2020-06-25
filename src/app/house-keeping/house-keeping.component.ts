import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {Shift} from "../interfaces/Shift";
import {HouseKeepingService} from "../_services/house-keeping.service";
import {RoomsService} from "../_services/rooms.service";
declare var $:JQueryStatic;

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
export class HouseKeepingComponent implements OnInit, AfterViewInit {

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
    isLoadingRooms:  false,
    pagination: {
      pageNum: 1,
      pageSize: 25,
      sortBy: '',
      sortOrder: false
    },
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
        this.pageFilters.sites = data['sites'][0].value;
        this.state.filterConfigs.houseKeepers = data['housekeepers'];
        this.state.filterConfigs.features = data['features'];
        this.state.filterConfigs.hsStatus = data['housekeepingStatuses'];
        this.state.filterConfigs.adminStatuses = data['adminStatuses'];
        this.pageFilters.sites = data['sites'][0]['value'];
        this.state.isLoading=false;
        this.ref.detectChanges();
        this.loadRooms();
      },
      err => {
        //handle errors here
        console.log(err);
        this.state.isLoading = false;
      });
  }

  public refreshFilter () {
    this.pageFilters = {
      isHousekeeperAdmin: true,
      sites:'',
      features: this.state.filterConfigs.sites[0].value,
      housekeepingStatuses: '',
      adminStatuses: '',
      housekeepers: ''
    }
    this.loadRooms();
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
        this.pageFilters.features =  this.pageFilters.sites;
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

  public loadRooms (append = false) {
    if(!this.state.isLoadingRooms) {
      this.state.isLoading = true;
    }

    this.ref.detectChanges();
    this.roomService.loadRooms(this.pageFilters.sites, {
      featureId : this.pageFilters.features,
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      sortBy: this.state.pagination.sortBy,
      sortOrder: this.state.pagination.sortOrder ? 'DESC' : 'ASC'
    }).subscribe(data => {
        console.log("processed")
        if(!append) {
          this.data = data;
        } else {
          this.data = this.data.concat(data);
        }
        this.state.isLoading = false;
        this.state.isLoadingRooms = false;
        this.ref.detectChanges();
      },
      err => {
        //handle errors here
        console.log(err);
        this.state.isLoading = false;
        this.state.isLoadingRooms = false;
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

  public setSortingParams (sortBy) {
    this.state.pagination.pageNum = 1;
    //false == asc, true=desc
    if(sortBy == this.state.pagination.sortBy) {
      this.state.pagination.sortOrder = !this.state.pagination.sortOrder;
    } else {
      this.state.pagination.sortOrder = false;
    }
    this.state.pagination.sortBy = sortBy;
    this.loadRooms();
    //this.state.pagination.sortOrder = this.state.pagination.sortOrder ? 'asc' : 'desc';
  }

  public loadNewPage () {
    this.state.pagination.pageNum++;
    console.log("called load new page");
  }

  public ngAfterViewInit () {

    $(".main-content-area").scroll((e, arg) => {
      var elem = $(e.currentTarget);
      if (elem[0].scrollHeight - elem.scrollTop() <= elem.outerHeight()) {
        if(this.state.isLoading || this.state.isLoadingRooms) return;
        console.log("bottom");
        this.state.pagination.pageNum++;
        this.state.isLoadingRooms = true;
        this.loadRooms (true);
      }
    });
  }
}
