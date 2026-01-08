import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChristmasScavenger3Component } from './christmas-scavenger3.component';

describe('ChristmasScavenger3Component', () => {
  let component: ChristmasScavenger3Component;
  let fixture: ComponentFixture<ChristmasScavenger3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristmasScavenger3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasScavenger3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
