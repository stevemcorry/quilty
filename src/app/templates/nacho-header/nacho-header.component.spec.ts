import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachoHeaderComponent } from './nacho-header.component';

describe('NachoHeaderComponent', () => {
  let component: NachoHeaderComponent;
  let fixture: ComponentFixture<NachoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
