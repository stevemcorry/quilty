import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerty',
  templateUrl: './alerty.component.html',
  styleUrls: ['./alerty.component.scss']
})
export class AlertyComponent implements OnInit {

  alertType = "hidden";
  alertMessage = "";
  constructor() { }

  ngOnInit() {
  }

  openAlert(message){
    this.alertType = "alert";
    this.alertMessage = message;
    setTimeout(()=>{
      this.closeAlert()
    },4000)
  }
  openWarn(message){
    this.alertType = "warn";
    this.alertMessage = message;
    setTimeout(()=>{
      this.closeAlert()
    },4000)
  }
  openSuccess(message){
    this.alertType = "success";
    this.alertMessage = message;
    setTimeout(()=>{
      this.closeAlert()
    },4000)
  }
  openInfo(message){
    this.alertType = "info";
    this.alertMessage = message;
    setTimeout(()=>{
      this.closeAlert()
    },4000)
  }
  closeAlert(){
    this.alertType = "hidden"
  }


}
