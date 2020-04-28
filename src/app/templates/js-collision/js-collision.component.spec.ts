import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsCollisionComponent } from './js-collision.component';

describe('JsCollisionComponent', () => {
  let component: JsCollisionComponent;
  let fixture: ComponentFixture<JsCollisionComponent>;

  beforeEach(async(() => {
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
