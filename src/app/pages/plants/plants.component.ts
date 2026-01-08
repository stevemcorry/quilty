import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessagesService } from 'app/services/messages.service';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Img, Plant, SunAmmount, WaterLog } from 'app/models/plant.model';


@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class PlantsComponent implements OnInit {

  //add plant variables
  name: string;
  care: string;
  wateringNotes: string;
  sunAmmount: SunAmmount;
  waterFrequency: number;

  plantImage;
  user;
  plants: Array<Plant> = [];
  preview;
  file;
  updateImage = false;
  uploading = false;
  showWaterLog = false;
  showSunAmmount = false;
  selectedPlant = new Plant("", 'test');

  selectedPlants = [];
  sortValue = 'lastWater';
  sortOrder = 'desc';

  public get sunAmmountType(): typeof SunAmmount {
    return SunAmmount; 
  }

  constructor(public messageSvc: MessagesService, public storage: AngularFireStorage, public auth: AngularFireAuth, config: NgbCarouselConfig) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user.uid;
      }
    })
  }

  @ViewChild('plantParallax') plantParallax: ElementRef;
  @HostListener("window:scroll", []) onWindowScroll(): void {
    const scrollHeight = window.scrollY;
    this.plantParallax.nativeElement.style.backgroundPosition = `0px -${scrollHeight / 2}px`;
  }

  ngOnInit() {
    this.messageSvc.getPlants().subscribe(res => {
      this.plants = res.map((plant) => {
        return new Plant(plant.key, plant.name, plant.care, plant.img, plant.imgLog, plant.lastWater, plant.waterLog, plant.active, plant.birthdate, plant.wateringNotes, plant.sunAmmount, plant.waterFrequency, plant.soilType);
      })
    })
  }

  async addPlant() {
    if (!this.user) {
      alert('You have no power here.');
      return;
    };
    if (!this.validate()) return;
    this.uploading = true;
    let upload = await this.uploadFile();
    if (!this.plantImage) {
      alert('Something happened...')
      return
    }
    let plant = new Plant("", this.name, this.care, new Img(this.plantImage));
    plant.imgLog = [new Img(this.plantImage)];
    this.messageSvc.addPlant(plant).then(() => {
      this.uploading = false;
      this.name = "";
      this.care = "";
      this.plantImage = null;
      document.getElementById('closeButton').click();
    })
  }

  validate() {
    if (this.name == "") return false
    if (!this.preview) return false
    if (this.uploading) return false;
    return true;
  }

  setEdit(plant) {
    this.selectedPlant = plant;
  }
  waterPlant() {
    if (!this.user) {
      alert('You have no power here.');
      return;
    };
    this.selectedPlant.lastWater = new WaterLog();
    this.selectedPlant.waterLog.push(this.selectedPlant.lastWater);
    this.editPlant();
  }
  massWater(){
    if (!this.user) {
      alert('You have no power here.');
      return;
    };
    console.log(this.selectedPlants, this.plants);
  }

  togglePlantSelection(plantKey: number) {
    if (this.selectedPlants.includes(plantKey)) {
      // Plant is already selected, remove it
      this.selectedPlants = this.selectedPlants.filter(key => key !== plantKey);
    } else {
      // Plant is not selected, add it
      this.selectedPlants.push(plantKey);
    }
  }

  async editPlant() {
    if (!this.user) {
      alert('You have no power here.');
      return;
    };
    if (this.uploading) return false;
    if (this.preview) {
      this.uploading = true;
      let upload = await this.addProgressImage();
      if (!this.plantImage) {
        alert('Something happened...')
        return
      }
      let tempImg:Img = new Img(this.plantImage)
      if (this.selectedPlant.imgLog) {
        this.selectedPlant.imgLog.push(tempImg);
      }
      this.selectedPlant.img = tempImg;
    }
    this.messageSvc.editPlant(this.selectedPlant).then(() => {
      this.uploading = false;
      this.plantImage = null;
      document.getElementById('closeEdit').click();
    })
  }

  prep(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.preview = reader.result;

      reader.readAsDataURL(file);
      this.file = file;
    }
  }

  async uploadFile() {
    const filePath: string = this.name.replace(" ", "-").toLowerCase() + Math.floor(Math.random() * 1000000);
    const store = await this.storage.upload(filePath, this.file)
    const ref = this.storage.ref(filePath)
    return new Promise((res, rej) => {
      ref.getDownloadURL().subscribe(data => {
        this.plantImage = data;
        this.file = null;
        this.preview = null;
        res(data);
      })
    })
  }
  async addProgressImage() {
    const filePath: string = this.selectedPlant.name.replace(" ", "-").toLowerCase() + new Date().toDateString() + Math.floor(Math.random() * 1000000);
    const store = await this.storage.upload(filePath, this.file)
    const ref = this.storage.ref(filePath)
    return new Promise((res, rej) => {
      ref.getDownloadURL().subscribe(data => {
        this.plantImage = data;
        this.file = null;
        this.preview = null;
        res(data);
      })
    })
  }
  getLast(last: WaterLog) {
    if (!last) return 'Never.';
    let date: any = new Date();
    let dif: any = date - Date.parse(last.date);
    dif = Math.floor(dif / (1000 * 3600 * 24))
    if (dif < 1) return 'Today.';
    if (dif == 1) return dif + ' day ago.';
    return dif + ' days ago.';
  }

  getWaterIcon(last: WaterLog, frequency = 7) {
    if (!last) return 'help';
    let date: any = new Date();
    let dif: any = date - Date.parse(last.date);
    dif = dif / (1000 * 3600 * 24)
    let final = Math.floor(dif)
    if(final == 0){
      return 'fresh';
    } else if (final < frequency - 1) {
      return 'watered';
    } else if (final < frequency + 2) {
      return 'almost'
    }
    return 'help';
  }
  getSunIcon(sunAmmount:SunAmmount){
    switch (sunAmmount) {
      case SunAmmount.Full:
        return "full-sun"
      case SunAmmount.PartialSun:
        return "part-sun"
      case SunAmmount.PartialShade:
        return "part-shade"
      case SunAmmount.FullShade:
        return "full-shade"
    }
  }
  toggleSortOrder(){
    this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
  }
  onSortValueChange(value){
    this.sortValue = value;
  }


}