import { Component } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-firebase';
  active: boolean = true;
  constructor(private url:LocationStrategy) { }

  ngOnInit() {

      console.log(this.url.path());
      if(this.url.path()==='/phaser'){
        this.active=false; 
      }

  }

}
