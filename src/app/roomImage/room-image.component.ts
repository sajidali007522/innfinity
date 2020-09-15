import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../http.service";
import {ConfirmModalComponent} from "../components/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-room-image',
  templateUrl: './room-image.component.html',
  styleUrls: ['./room-image.component.css']
})

export class RoomImageComponent implements OnInit,OnChanges {
  @Input() siteId;
  @Input() room;
  @ViewChild(ConfirmModalComponent) childcomp: ConfirmModalComponent;
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

  openModal(){
    this.childcomp.openModal();
  }

  loadRoomImages() {
    if(this.siteId == '' || this.room.roomId == '' || this.state.isLoadingImages) {
      return;
    }
    this.state.isLoadingImages=true;
    this._http._get('housekeeping/'+this.siteId+'/RoomImages/'+this.room.roomId)
      .subscribe((data:any) => {
        this.state.roomImages = [];
        data.filter(r=> {
          //createDate
          let d = new Date(Date.parse(r.createDate))
          r.createDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes();
          this.state.roomImages.push(r);
        })
        this.state.selectedImage = this.state.roomImages[this.state.roomImages.length-1];
        this.state.selectedIndex = this.state.roomImages.length-1;
        this.state.isLoadingImages = false;
        this.ref.detectChanges();
      },
      error => { console.log(error)},
      ()=>{this.state.isLoadingImages = false;console.log('completed')});
  }
  editImage(image, index) {
    this.state.selectedImage = image;
    this.state.selectedIndex = index;
  }

  save(){
    this.state.isLoadingImages = true;
    this._http._patch('housekeeping/'+this.siteId+'/RoomImage/'+this.room.roomId+'/'+this.state.selectedImage.documentArchiveIndexID, {},
      {
        name: this.state.selectedImage.name,
        description: this.state.selectedImage.description
      })
      .subscribe(data => {
        this.state.componentState.isViewMode=true;
      },
        error => { console.log(error)},
      ()=>{this.state.isLoadingImages = false;console.log('completed'); this.ref.detectChanges();});
  }

  edit(){
    this.state.componentState.isViewMode=false;
    this.state.componentState.selectedImage = JSON.parse(JSON.stringify(this.state.selectedImage));
  }

  deleteImage(event) {
    //delete logic
    if(event) {
      this.state.isLoadingImages = true;
      this._http._delete('housekeeping/'+this.siteId+'/RoomImage/'+this.room.roomId+'/'+this.state.selectedImage.documentArchiveIndexID)
        .subscribe(data => {
          this.state.roomImages.splice(this.state.selectedIndex, 1);
          this.state.selectedImage = this.state.roomImages[this.state.roomImages.length-1];
          this.state.selectedIndex = this.state.roomImages.length-1;
          this.state.componentState.isViewMode=true;
          this.state.isLoadingImages = false;
        },
        error => { console.log(error)},
        ()=>{this.state.isLoadingImages = false; this.ref.detectChanges();console.log('completed')});
    }
  }

  reset(){
    this.state.componentState.isViewMode=true;
    this.state.selectedImage = JSON.parse(JSON.stringify(this.state.componentState.selectedImage));
  }
}
