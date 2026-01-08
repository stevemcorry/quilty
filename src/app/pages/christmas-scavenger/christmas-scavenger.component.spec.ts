import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChristmasScavengerComponent } from './christmas-scavenger.component';

describe('ChristmasScavengerComponent', () => {
  let component: ChristmasScavengerComponent;
  let fixture: ComponentFixture<ChristmasScavengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristmasScavengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasScavengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
