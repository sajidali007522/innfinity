import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() className?: string;
  constructor() { }

  ngOnInit(): void {
    this.className = this.className ? this.className : 'loader-lg';
  }

}
