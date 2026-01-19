import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingRsvpComponent } from './wedding-rsvp.component';

describe('WeddingRsvpComponent', () => {
  let component: WeddingRsvpComponent;
  let fixture: ComponentFixture<WeddingRsvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingRsvpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingRsvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
