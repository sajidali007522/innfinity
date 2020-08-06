import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-workflow-tree',
  templateUrl: './workflow-tree.component.html',
  styleUrls: ['./workflow-tree.component.css']
})
export class WorkflowTreeComponent implements OnInit {
  @Input() workflow;
  constructor() { }

  ngOnInit(): void {
  }

}
