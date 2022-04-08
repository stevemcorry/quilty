import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { TravelStuffComponent } from './travel-stuff.component';

describe('TravelStuffComponent', () => {
  let component: TravelStuffComponent;
  let fixture: ComponentFixture<TravelStuffComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
