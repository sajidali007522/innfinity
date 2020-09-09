import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-room-images',
  templateUrl: './room-images.component.html',
  styleUrls: ['./room-images.component.css']
})
export class RoomImagesComponent implements OnInit {

  constructor (private renderer: Renderer2) {
    this.addJsToElement('assets/js/slick.min.js');
    this.addJsToElement('assets/js/hp.js');
  }

  ngOnInit(): void {
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }


}

