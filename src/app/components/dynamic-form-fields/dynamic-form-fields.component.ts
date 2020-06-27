import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-form-fields',
  templateUrl: './dynamic-form-fields.component.html',
  styleUrls: ['./dynamic-form-fields.component.css']
})
export class DynamicFormFieldsComponent implements OnInit {

  @Input() public fields;
  @Input() public wrapperClass;
  @Input() public FieldWrapperClass;
  @Input() public booleanFieldClass;
  constructor() { }

  ngOnInit(): void {
  }

  getClassName (type) {
    let className = '';
    switch (type) {
      case 'Boolean':
          className = this.booleanFieldClass;
        break;
      default:
        className = this.FieldWrapperClass;
        break;
    }
    return [className];
  }
}
