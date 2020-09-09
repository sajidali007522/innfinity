import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit,AfterViewInit {
  state= {
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
  ) {
    this.addJsToElement('assets/js/slick.min.js');
    this.addJsToElement('assets/js/hp.js');
  }

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

  EditImage(image) {
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
        this.state.isLoadingImages = false;
      })
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

}
