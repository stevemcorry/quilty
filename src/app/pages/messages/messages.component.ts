import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { ScrapeService } from 'src/app/services/scrape.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  username;
  message;
  messages;
  messageSub;

  constructor(
    private messageService: MessagesService,
    private scrapeService: ScrapeService
  ) { }

  ngOnInit() {

    this.messageSub = this.messageService.getMessages().subscribe(res=>{
      this.messages = res;
      console.log('this is the message',res);
    });

  }
  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }

  sendMessage(){
    if(this.message && this.username){
      let message = this.message;
      this.message = "";
      this.messageService.sendMessage(message, this.username);
    } else {
      alert('ADD A USERNAME YOU RAGING IDOT')
    }
  }

  deleteMessage(key){

    this.messageService.deleteMessage(key);

  }
  scrape(){
    this.scrapeService.scrapeUrl('');
  }



}
