import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Renderer2,
  AfterViewChecked, OnDestroy
} from '@angular/core';
import {Shift} from "../interfaces/Shift";
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {HouseKeepingService} from "../_services/house-keeping.service";
import {RoomsService} from "../_services/rooms.service";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
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
export class HouseKeepingComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  data;
  pageFilters= {
    isHousekeeperAdmin: true,
    sites:'',
    features: '00000000-0000-0000-0000-000000000000',
    housekeepingStatuses: '',
    adminStatuses: '',
    housekeepers: ''
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  state = {
    selectedRoom: {roomId: '', roomNumber: ''},
    roomImage: {
      name: '',
      description: ''
    },
    isLoading: false,
    isLoadingRooms:  false,
    isLoadingMoreRooms: false,
    toggleFilter: false,
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
               private ref: ChangeDetectorRef,
               private renderer: Renderer2,
               private _http: HttpService,
               private router: Router
  ) {

  }
  ngOnDestroy() {
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
    if(!this.state.isLoadingMoreRooms) {
      this.state.isLoadingRooms = true;
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
        this.state.isLoadingRooms = false;
        this.state.isLoadingMoreRooms = false;
        this.ref.detectChanges();
      },
      err => {
        //handle errors here
        console.log(err);
        this.state.isLoadingRooms = false;
        this.state.isLoadingMoreRooms = false;
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
        if(this.state.isLoading || this.state.isLoadingRooms || this.state.isLoadingMoreRooms) return;
        console.log("bottom");
        this.state.pagination.pageNum++;
        this.state.isLoadingMoreRooms = true;
        this.loadRooms (true);
      }
    });

  }

  public ngAfterViewChecked() {
    //this.addJsToElement('assets/js/plugins/jsmartable.js');
    //$(".jsmartable").jsmartable();
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  fileChangeEvent(event: any, room:any): void {
    this.state.selectedRoom = room;
    this.imageChangedEvent = event;
    $(".trigger-image-crop-model").trigger('click');
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
    let image = this.croppedImage.split(",");
    this._http._post('housekeeping/'+this.pageFilters.sites+'/RoomImage/'+this.state.selectedRoom.roomId,
      {
            value:  image[1]
      },
      {
        imageName: this.state.roomImage.name,
        imageDescription: this.state.roomImage.description
      })
      .subscribe(data=> {
        //this.router.navigate(['/house-keeping/'+this.pageFilters.sites+'/room/'+this.state.selectedRoom.roomId]);
      },
        err => {
        console.log(err);
        })

  }

  cancelImageCrop () {
    this.imageChangedEvent = null;
    this.croppedImage = null;
  }
}
