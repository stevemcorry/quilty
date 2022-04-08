import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { MuscleBeachComponent } from './muscle-beach.component';

describe('MuscleBeachComponent', () => {
  let component: MuscleBeachComponent;
  let fixture: ComponentFixture<MuscleBeachComponent>;

  beforeEach(waitForAsync(() => {
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
