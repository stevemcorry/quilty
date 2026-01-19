import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StitchMakerComponent } from './stitch-maker.component';

describe('StitchMakerComponent', () => {
  let component: StitchMakerComponent;
  let fixture: ComponentFixture<StitchMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StitchMakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StitchMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
