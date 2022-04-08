import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssPhotoColumnsComponent } from './css-photo-columns.component';

describe('CssPhotoColumnsComponent', () => {
  let component: CssPhotoColumnsComponent;
  let fixture: ComponentFixture<CssPhotoColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssPhotoColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssPhotoColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
