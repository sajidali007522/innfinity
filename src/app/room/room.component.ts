import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  state= {
    siteId: '',
    roomId: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private _http: HttpService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.state.siteId = params["site_id"];
      this.state.roomId = params['room_id'];
    });
    console.log(this.state.siteId, this.state.roomId )
    if(this.state.roomId) {
      this.loadRoomDetails(this.state.roomId);
    }
  }

  loadRoomDetails(roomID) {
    this._http._get('housekeeping/'+this.state.siteId+'/RoomImage/'+roomID)
      .subscribe(data =>{
        console.log(data);
      })
  }

}
