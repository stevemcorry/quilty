import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternModalComponent } from './pattern-modal.component';

describe('PatternModalComponent', () => {
  let component: PatternModalComponent;
  let fixture: ComponentFixture<PatternModalComponent>;

  beforeEach(async(() => {
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
