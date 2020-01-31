import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelizeComponent } from './pixelize.component';

describe('PixelizeComponent', () => {
  let component: PixelizeComponent;
  let fixture: ComponentFixture<PixelizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
