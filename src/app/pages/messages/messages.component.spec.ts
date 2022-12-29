import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages.component';
import { MessagesService } from 'app/services/messages.service';
import { ScrapeService } from 'app/services/scrape.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      imports: [ FormsModule],
      providers: [ MessagesService, ScrapeService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
