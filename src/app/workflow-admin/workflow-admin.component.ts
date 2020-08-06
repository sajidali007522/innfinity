import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-workflow-admin',
  templateUrl: './workflow-admin.component.html',
  styleUrls: ['./workflow-admin.component.css']
})
export class WorkflowAdminComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  public workflowJson;
  public parsedJson
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
  }

  ngOnInit(): void {
  }

  parseJson () {
    this.parsedJson = JSON.parse(this.workflowJson)
  }

}
