import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectwoComponent } from './projectwo.component';

describe('ProjectwoComponent', () => {
  let component: ProjectwoComponent;
  let fixture: ComponentFixture<ProjectwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
