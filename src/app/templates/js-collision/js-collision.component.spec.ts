import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { JsCollisionComponent } from './js-collision.component';

describe('JsCollisionComponent', () => {
  let component: JsCollisionComponent;
  let fixture: ComponentFixture<JsCollisionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsCollisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsCollisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
