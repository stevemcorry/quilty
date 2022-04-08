import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { SwolecityComponent } from './swolecity.component';

describe('SwolecityComponent', () => {
  let component: SwolecityComponent;
  let fixture: ComponentFixture<SwolecityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwolecityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwolecityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
