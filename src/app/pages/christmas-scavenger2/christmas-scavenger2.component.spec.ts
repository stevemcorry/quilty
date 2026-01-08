import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChristmasScavenger2Component } from './christmas-scavenger2.component';

describe('ChristmasScavenger2Component', () => {
  let component: ChristmasScavenger2Component;
  let fixture: ComponentFixture<ChristmasScavenger2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristmasScavenger2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasScavenger2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
