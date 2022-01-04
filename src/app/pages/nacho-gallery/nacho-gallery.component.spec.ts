import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachoGalleryComponent } from './nacho-gallery.component';

describe('NachoGalleryComponent', () => {
  let component: NachoGalleryComponent;
  let fixture: ComponentFixture<NachoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachoGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
