import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayModalComponent } from './delay-modal.component';

describe('DelayModalComponent', () => {
  let component: DelayModalComponent;
  let fixture: ComponentFixture<DelayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
