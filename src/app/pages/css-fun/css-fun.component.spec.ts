import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssFunComponent } from './css-fun.component';

describe('CssFunComponent', () => {
  let component: CssFunComponent;
  let fixture: ComponentFixture<CssFunComponent>;

  beforeEach(async(() => {
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
