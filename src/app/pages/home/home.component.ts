import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message;
  messages;
  messageSub;

  constructor(
    private messageService: MessagesService,
  ) { }

  ngOnInit() {
    this.messageSub = this.messageService.getMessages().subscribe(res=>{
      this.messages = res;
      console.log(res);
    });
  }
  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  sendMessage(){
    this.messageService.sendMessage(this.message);
  }

}
