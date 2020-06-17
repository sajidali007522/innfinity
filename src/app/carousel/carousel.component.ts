import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor (private renderer: Renderer2) {
    this.addJsToElement('assets/carousel/assets/js/slick.min.js');
    this.addJsToElement('assets/carousel/assets/js/hp.js');
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
