import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlElementsComponent } from './html-elements.component';

describe('HtmlElementsComponent', () => {
  let component: HtmlElementsComponent;
  let fixture: ComponentFixture<HtmlElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
