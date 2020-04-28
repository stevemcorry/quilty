import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouphomeComponent } from './couphome.component';

describe('CouphomeComponent', () => {
  let component: CouphomeComponent;
  let fixture: ComponentFixture<CouphomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouphomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouphomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
