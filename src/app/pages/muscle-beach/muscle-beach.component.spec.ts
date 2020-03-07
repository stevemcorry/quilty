import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleBeachComponent } from './muscle-beach.component';

describe('MuscleBeachComponent', () => {
  let component: MuscleBeachComponent;
  let fixture: ComponentFixture<MuscleBeachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuscleBeachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuscleBeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
