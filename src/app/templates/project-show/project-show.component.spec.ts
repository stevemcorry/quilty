import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ProjectShowComponent } from './project-show.component';

describe('ProjectShowComponent', () => {
  let component: ProjectShowComponent;
  let fixture: ComponentFixture<ProjectShowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
