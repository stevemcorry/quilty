import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-wedding-rsvp',
  templateUrl: './wedding-rsvp.component.html',
  styleUrls: ['./wedding-rsvp.component.scss']
})
export class WeddingRsvpComponent {
  guestName = '';
  attendance = '';
  guests = 1;
  rsvpList = [];


  constructor(
    private db: AngularFireDatabase
  ) {
    this.getRSVPList();
  }
  onSubmit() {
    // Access form data here
    console.log('Name:', this.guestName);
    console.log('Attendance:', this.attendance);
    console.log('Guests:', this.guests);
    // Add your submit logic
    if (this.guestName && this.attendance){
      const formData = {
        name: this.guestName,
        attendance: this.attendance,
        guestCount: this.guests
      };
      this.sendMessage(formData).then(() => {
        console.log('RSVP submitted successfully');
      });
    }
  }


  sendMessage(data){
    return this.db.list('/wedding-rsvp').push(data);
  }
  getRSVPList(){
    this.db.list('/wedding-rsvp').valueChanges().subscribe(list => {
      this.rsvpList = list;
      console.log('list', this.rsvpList);
    });
  }
}
