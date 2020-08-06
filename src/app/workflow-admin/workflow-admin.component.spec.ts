import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAdminComponent } from './workflow-admin.component';

describe('WorkflowAdminComponent', () => {
  let component: WorkflowAdminComponent;
  let fixture: ComponentFixture<WorkflowAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
