import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

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

sendMessage(text, user){
  
  text = {original: text, user: user}
  return this.db.list('/messages').push(text)

}

addPattern(pattern, name){
  
  var obj = {steps: pattern, name: name}
  return this.db.list('/patterns').push(obj)

}
getPatterns(){

  // return this.todos$ = this.db.list('/messages');
  return this.db.list('/patterns').snapshotChanges()
  .pipe(map(items => {
    return items.map(a => {
      const data:any = a.payload.val();
      const key = a.payload.key;
      return {
        key: key,
        name: data.name,
        steps: data.steps,
      }
    });
  }));
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

  // return this.todos$ = this.db.list('/messages');
  return this.db.list('/messages').snapshotChanges()
  .pipe(map(items => {
    return items.map(a => {
      const data:any = a.payload.val();
      const key = a.payload.key;
      return {
        key: key,
        original: data.original,
        uppercase: data.uppercase,
        user: data.user
      }
    });
  }));
}

deleteMessage(key){

  return this.db.list('/messages/' + key).remove();

}

}
