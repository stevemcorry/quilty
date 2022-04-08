import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { CssFunComponent } from './css-fun.component';

describe('CssFunComponent', () => {
  let component: CssFunComponent;
  let fixture: ComponentFixture<CssFunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CssFunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
