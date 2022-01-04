import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemosComponent } from './show-demos.component';

describe('ShowDemosComponent', () => {
  let component: ShowDemosComponent;
  let fixture: ComponentFixture<ShowDemosComponent>;

  beforeEach(async(() => {
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
