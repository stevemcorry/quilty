import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { PlatformerComponent } from './platformer.component';

describe('PlatformerComponent', () => {
  let component: PlatformerComponent;
  let fixture: ComponentFixture<PlatformerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
