import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SignaturePad} from "ngx-signaturepad";

@Component({
  selector: 'app-digital-sign',
  templateUrl: './digital-sign.component.html',
  styleUrls: ['./digital-sign.component.css']
})
export class DigitalSignComponent implements OnInit,AfterViewInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.addJsToElement('/assets/js/signature-handler.js')// this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    //console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clearSignature(){
    this.signaturePad.clear();
  }

  submitSignature() {
    console.log(this.signaturePad.toDataURL());
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
