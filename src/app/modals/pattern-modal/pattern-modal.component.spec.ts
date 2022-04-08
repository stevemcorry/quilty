import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PatternModalComponent } from './pattern-modal.component';

describe('PatternModalComponent', () => {
  let component: PatternModalComponent;
  let fixture: ComponentFixture<PatternModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
