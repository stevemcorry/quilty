import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { IntroAnimationComponent } from './intro-animation.component';

describe('IntroAnimationComponent', () => {
  let component: IntroAnimationComponent;
  let fixture: ComponentFixture<IntroAnimationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
