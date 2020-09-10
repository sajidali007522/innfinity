import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../http.service";
import {RoomsService} from "../_services/rooms.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit,AfterViewInit {
  keyword='text';
  error;
  bsConfig: Partial<BsDatepickerConfig>;
  minDate: Date;

  state= {
    roomList: <any>[],
    searchRooms: false,
    isLoadingRoom: false,
    isLoadingImages: false,
    siteId: '',
    roomId: '',
    selectedImage: <any>{
      roomNumber: '',
      description: '',
      createdDate: ''
    },
    room: <any>{
      roomNumber:"",
      description: '',
      createdDate: ''
    },
    roomImages: <any>[]
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private _http: HttpService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.state.siteId = params["site_id"];
      this.state.roomId = params['room_id'];
    });
    console.log(this.state.siteId, this.state.roomId)
    if (this.state.roomId) {
      this.loadRoomDetails(this.state.roomId);
      this.loadRoomImages(this.state.roomId);
    }
  }

  ngAfterViewInit() {

  }

  editImage(image) {
    this.state.selectedImage = image;
  }

  loadRoomDetails(roomID){
    this.state.isLoadingRoom = true;
    this._http._get('housekeeping/'+this.state.siteId+'/Rooms/'+roomID)
      .subscribe(data => {
        this.state.room = data;
        this.state.isLoadingRoom = false;
      })
  }

  loadRoomImages(roomID) {
    this.state.isLoadingImages=true;
    this._http._get('housekeeping/'+this.state.siteId+'/RoomImages/'+roomID)
      .subscribe(data =>{
        this.state.roomImages = data;
        this.state.selectedImage = this.state.roomImages[this.state.roomImages.length-1];
        this.state.isLoadingImages = false;
      })
  }


  //search section
  selectRoom (item) {
    console.log(item);
    this.loadRoomDetails(item.value);
    this.loadRoomImages(item.value);

  }

  searchCleared() {
    this.state.roomList = [];
  }

  getServerResponse(event) {
    this.error = '';
    this.state.searchRooms = true;

    let params = {searchTerm: event};

    this._http._get("housekeeping/RoomSearch", params)
      .subscribe(data => {
        if (data == undefined) {
          this.state.roomList = [];
          this.error = data['Error'];
        } else {
          this.state.roomList = data;
        }
        this.state.searchRooms = false;
      },error => {
        this.error = error;
        this.state.searchRooms = false;
      });
  }

}
