import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {

  constructor() { }
  droppedItems =[];
  ngOnInit(): void {
  }
  items = [
    {name: "Apple", type: "fruit"},
    {name: "Carrot", type: "vegetable"},
    {name: "Orange", type: "fruit"}];

  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);
  }

}
