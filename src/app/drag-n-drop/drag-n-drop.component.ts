import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {

  droppedItems =[];
  connectedTo=[];
  ngOnInit(): void {
  }
  items = [
    {name: "Apple", type: "fruit", cells:[
        {label: 1, value: 1},
        {label: 2, value: 2},
        {label: 3, value: 3},
        {label: 4, value: 4},
        {label: 5, value: 5},
      ]
    },
    {name: "Carrot", type: "vegetable", cells:[
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'},
        {label: 'D', value: 'D'},
        {label: 'E', value: 'E'},
      ]
    },
    {name: "Orange", type: "fruit", cells:[
        {label: 'a', value: 'a'},
        {label: 'b', value: 'b'},
        {label: 'c', value: 'c'},
        {label: 'd', value: 'd'},
        {label: 'e', value: 'e'},
      ]
    }
  ];
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'https://image.shutterstock.com/image-vector/abstract-lines-dots-connect-background-260nw-1492332182.jpg',
    'https://image.shutterstock.com/image-photo/wildlife-conservation-day-wild-animals-600w-1710680038.jpg'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
    'https://www.tgdaily.com/wp-content/uploads/2019/05/Teen_Tech.jpg'
  ];

  review = [
    'Take bath',
    'Wash car',
    'https://image.shutterstock.com/image-photo/proud-noble-deer-male-winter-600w-1183677967.jpg'
  ];
  timePeriods = [
    {label: 'Bronze age', years: [{label: 'A'},{label: 'B'},{label: 'C'}]},
    {label: 'Iron age', years: [{label: 'D'},{label: 'E'},{label: 'F'}]},
    {label: 'Middle ages', years: [{label: 'G'},{label: 'H'},{label: 'I'}]},
    {label: 'Early modern period', years: [{label: 'J'},{label: 'K'},{label: 'L'}]},
    {label: 'Long nineteenth century', years: [{label: 'M', 'src': 'https://i.pinimg.com/736x/00/7d/87/007d8739fb360bf9d9540c0056153d5a.jpg'},{label: 'N'},{label: 'O'}]}
  ];
  constructor() {
    for (let i=1; i<=this.timePeriods.length; i++) {
      this.connectedTo.push("container_"+ i);
    };
  }

  dropHorizontal(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);
  }

  updateCell (e: any, item, index) {
    console.log(item, index, e.dragData)
    item.cells[index] = e.dragData;
  }

  isUrl (string) {
    return string.indexOf('://') !== -1;
  }
}
