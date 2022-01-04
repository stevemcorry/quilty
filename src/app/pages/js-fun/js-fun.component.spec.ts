import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsFunComponent } from './js-fun.component';

describe('JsFunComponent', () => {
  let component: JsFunComponent;
  let fixture: ComponentFixture<JsFunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsFunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
