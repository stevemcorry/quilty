import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertyComponent } from './alerty.component';

describe('AlertyComponent', () => {
  let component: AlertyComponent;
  let fixture: ComponentFixture<AlertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
