import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
// import { ScrapeService } from 'app/services/scrape.service';
// import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loadingProgress = "";
  loadingTimer;
  finishedVerify;
  user;

  constructor(
    private router: Router,
    private auth: AngularFireAuth
    ) {

      // let initParams: InitParams = {
      //   appId: '877305529444067',
      //   xfbml: true,
      //   version: 'v2.8'
      // };
   
      // fb.init(initParams);
      
      this.auth.authState.subscribe(user => {
          console.log('true user', user)
          this.user = user;
          if(user){
            this.finishedVerify = true;
          }
      })

    }

  ngOnInit() {
    this.loadingCount();
    // let url = this.router.url.split('=');
    // let code = url[1];
    // if (code) {
    //   console.log(code);
    //   this.getUserData(code);
    // }
    // else {
    //   console.log('error')
    // }
    this.getLogin();
  }

  loadingCount(){
    if(this.user) return;
    switch(this.loadingProgress){
      case "":
        this.loadingProgress = "s";
        break;
      case "s":
        this.loadingProgress = "L";
        break;
      case "L":
        this.loadingProgress = "o";
        break;
      case "o":
        this.loadingProgress = "a";
        break;
      case "a":
        this.loadingProgress = "d";
        break;
      case "d":
        this.loadingProgress = "i";
        break;
      case "i":
        this.loadingProgress = "n";
        break;
      case "n":
        this.loadingProgress = "g";
        break;
      case "g":
        this.loadingProgress = ".";
        break;
      case ".":
        this.loadingProgress = ",";
        break;
      case ",":
        this.loadingProgress = "/";
        break;
      case "/":
        this.loadingProgress = "L";
        break;
    }
    this.loadingTimer = setTimeout(()=>{
      this.loadingCount();
    },700)
  }


  login() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
  logout() {
    this.auth.signOut();
  }

  getLogin(){
    // this.fb.getLoginStatus().then(res=>{
    //   console.log('logged in?: ', res)
    // });
    // this.fb.login().then(res=>{
    //   console.log('thien?', res)
    // })

  }
  checkStatus(){
    // this.fb.getLoginStatus().then(res=>{
    //   console.log('logged in?: ', res)
    // });
  }

  // getUserData(code){
  //   this.mainService.instaAccess(code)
  //   .subscribe((data) =>{
  //     console.log(data,'data')
  //   });
  // }
  

}
