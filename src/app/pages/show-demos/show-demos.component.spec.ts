import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ShowDemosComponent } from './show-demos.component';

describe('ShowDemosComponent', () => {
  let component: ShowDemosComponent;
  let fixture: ComponentFixture<ShowDemosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
