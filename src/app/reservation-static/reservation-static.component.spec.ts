import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStaticComponent } from './reservation-static.component';

describe('ReservationStaticComponent', () => {
  let component: ReservationStaticComponent;
  let fixture: ComponentFixture<ReservationStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
