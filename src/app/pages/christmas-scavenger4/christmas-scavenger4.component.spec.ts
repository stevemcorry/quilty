import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChristmasScavenger4Component } from './christmas-scavenger4.component';

describe('ChristmasScavenger4Component', () => {
  let component: ChristmasScavenger4Component;
  let fixture: ComponentFixture<ChristmasScavenger4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristmasScavenger4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasScavenger4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
