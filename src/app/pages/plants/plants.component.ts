import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { storage } from 'firebase';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlantsComponent implements OnInit {

  name;
  care;
  plantImage;
  user;
  plants = [];
  preview;
  file;
  updateImage = false;
  uploading = false;
  selectedPlant = new Plant('test');
  constructor(public messageSvc: MessagesService, public storage: AngularFireStorage, public auth:AngularFireAuth) { 
    this.auth.authState.subscribe(user => {
        console.log('true user', user)
        if(user){
          this.user = user.uid;
        }
    })
  }

  ngOnInit() {
    this.messageSvc.getPlants().subscribe(res=>{
      console.log('plant', res);
      this.plants = res;
    })
  }

  async addPlant(){
    if(!this.user) {
      alert('You have no power here.');
      return;
    };
    if(!this.validate()) return;
    this.uploading = true;
    let upload = await this.uploadFile();
    if(!this.plantImage){ 
      alert('Something happened...')
      return 
    }
    let plant = new Plant(this.name, this.care, this.plantImage);
    this.messageSvc.addPlant(plant).then(()=>{
      this.uploading = false;
      this.name = "";
      this.care = "";
      this.plantImage = "";
      document.getElementById('closeButton').click();
    })
  }

  setEdit(plant){
    this.selectedPlant = plant;
    console.log(this.selectedPlant);
  }
  waterPlant(){
    if(!this.user) return;
    if(this.uploading) return;
    this.uploading = true;
    this.selectedPlant.lastWater = (new Date()).toDateString();
    this.selectedPlant.waterLog.push(this.selectedPlant.lastWater);
    this.editPlant();
  }

  async editPlant(){
    if(!this.user) {
      alert('You have no power here.');
      return;
    };
    if(!this.validate()) return;
    this.uploading = true;
    let upload = await this.addProgressImage();
    if(!this.plantImage){ 
      alert('Something happened...')
      return 
    }
    if(this.selectedPlant.imgLog){
      this.selectedPlant.imgLog.push(new Img(this.selectedPlant.img));
    }else{
      this.selectedPlant.imgLog = [new Img(this.selectedPlant.img, 'Fri Mar 11 2022')];
      this.selectedPlant.imgLog.push(this.plantImage);
    }
    this.selectedPlant.img = this.plantImage;
    this.messageSvc.editPlant(this.selectedPlant).then(()=>{
      this.uploading = false;
      this.plantImage = "";
      document.getElementById('closeEdit').click();
    })
  }

  prep(event){
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.preview = reader.result;

        reader.readAsDataURL(file);
        this.file = file;
    }
  }

  async uploadFile() {
    const filePath:string = this.name.replace(" ", "-").toLowerCase() + Math.floor(Math.random() * 1000000);
    const store = await this.storage.upload(filePath, this.file)
    const ref = this.storage.ref(filePath)
    return new Promise((res, rej)=>{
      ref.getDownloadURL().subscribe(data=>{
        this.plantImage = data;
        this.file = null;
        this.preview = null;
        res(data);
      })
    })
  }
  async addProgressImage(){
    const filePath:string = this.selectedPlant.name.replace(" ", "-").toLowerCase()+ new Date().toDateString() + Math.floor(Math.random() * 1000000);
    const store = await this.storage.upload(filePath, this.file)
    const ref = this.storage.ref(filePath)
    return new Promise((res, rej)=>{
      ref.getDownloadURL().subscribe(data=>{
        this.plantImage = data;
        this.file = null;
        this.preview = null;
        res(data);
      })
    })
  }

  validate(){
    if(this.name == "") return false
    if(!this.preview) return false
    if(this.uploading) return false;
    return true;
  }
  getLast(last){
    if(!last) return 'Never.';
    let date:any = new Date();
    let dif:any = date - Date.parse(last);
    dif = Math.floor(dif / (1000 * 3600 * 24))
    if(dif < 1) return 'Today.';
    if(dif == 1) return dif + ' day ago.' ;
    return dif + ' days ago.' ;
  }
  getWaterIcon(last){
    if(!last) return 'help';
    let date:any = new Date();
    let dif:any = date - Date.parse(last);
    dif = dif / (1000 * 3600 * 24)
    let final = Math.floor(dif)
    if(final < 6){
      return 'watered';
    } else if(final < 12){
      return 'almost'
    }
    return 'help';
  }


}


class Plant{

  name:String;
  care:String;
  key:String;
  img;
  imgLog: Array<Img>;
  lastWater:String;
  waterLog:Array<String>;

  constructor(name, care = "", img = "", lastWater = null, waterLog = []){
    this.name = name;
    this.care = care;
    this.img = img;
  }
}
class Img{
  url: String;
  date: String;
  constructor(url, date = new Date().toDateString()){
    this.url = url;
    this.date = date;
  }
}