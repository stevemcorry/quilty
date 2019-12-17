import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) { }

  sendMessage(text){

  let url = `https://us-central1-new-angular-firebase.cloudfunctions.net/addMessage`;
  var params = {text: text};

  return this.http.post(url, params, this.httpOptions).subscribe(res=>{
    console.log(res);
  }, err =>{
    console.log('error', err)
  })

}

helloWorld(){

  let url = `https://us-central1-new-angular-firebase.cloudfunctions.net/helloWorld`;
  return this.http.get(url, this.httpOptions).subscribe(res=>{
    console.log(res)
  }, err =>{
    console.log('error', err)
  })

}

messages;
getMessages(){

  return this.db.list('/messages').valueChanges()

  // let url = `https://us-central1-new-angular-firebase.cloudfunctions.net/getMessages`;
  // return this.http.get(url, this.httpOptions).subscribe(res=>{
  //   console.log(res)
  // }, err =>{
  //   console.log('error', err)
  // })

}

}
