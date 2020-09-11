import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-room-image',
  templateUrl: './room-image.component.html',
  styleUrls: ['./room-image.component.css']
})

export class RoomImageComponent implements OnInit,OnChanges {
  @Input() siteId;
  @Input() room;

  state={
    isLoadingImages:false,
    roomImages: <any>[],
    selectedIndex: -1,
    selectedImage: <any>{
      roomNumber: '',
      description: '',
      createdDate: ''
    },
    componentState: {
      isViewMode: true,
      selectedImage:<any>{
        roomNumber: '',
        description: '',
        createdDate: ''
      }
    }
  };
  constructor(private _http: HttpService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}
  ngOnChanges() {
    this.loadRoomImages();
  }
  loadRoomImages() {
    if(!this.siteId || !this.room.roomId || this.state.isLoadingImages) {
      return;
    }
    this.state.isLoadingImages=true;
    this._http._get('housekeeping/'+this.siteId+'/RoomImages/'+this.room.roomId)
      .subscribe((data) => {
        this.state.roomImages = data;
        this.state.selectedImage = this.state.roomImages[this.state.roomImages.length-1];
        this.state.selectedIndex = this.state.roomImages.length-1;
        this.state.isLoadingImages = false;
        this.ref.detectChanges();
      });
  }
  editImage(image) {
    this.state.selectedImage = image;
  }

  save(){
    this.state.componentState.isViewMode=true;
  }

  edit(){
    this.state.componentState.isViewMode=false;
    this.state.componentState.selectedImage = JSON.parse(JSON.stringify(this.state.selectedImage));
  }
  deleteImage() {
    //delete logic
    this.state.roomImages.splice(this.state.selectedIndex, 1);
  }
  reset(){
    this.state.componentState.isViewMode=true;
    this.state.selectedImage = JSON.parse(JSON.stringify(this.state.componentState.selectedImage));
  }
}
