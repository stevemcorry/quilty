import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-stuff',
  templateUrl: './travel-stuff.component.html',
  styleUrls: ['./travel-stuff.component.scss']
})
export class TravelStuffComponent implements OnInit {

  selectedFile: File;
  travelArr = [];
  lastPlaceShow = {
    type: "",
    name: ""
  };
  currentPlaceShow = {
    type: "",
    name: ""
  };
  placeCounter = 0;

  constructor() { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let fileReader:any = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      var travels = JSON.parse(fileReader.result);
      this.parseTravelJson(travels.timelineObjects)
      // console.log(travels);
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }
  msToDate(ms){
    return (new Date(ms * 1000)).toLocaleDateString();
  }
  parseTravelJson(travels){
    var activityArr = [];
    var placesVisitedArr = [];
    var allArr = [];
    for(let travel of travels){
      if(travel.activitySegment){
        var activity = { 
          type: "activity", 
          name:travel.activitySegment.activityType
        }
        activityArr.push(travel);
        allArr.push(activity);
      } else {
        var place = { 
          type: "place", 
          name: travel.placeVisit.location.name
        }
        placesVisitedArr.push(place);
        allArr.push(place);
      }
    }
    this.travelArr = allArr;
    this.showPlaces();
    // console.log(allArr)
    console.log(activityArr);
    console.log(placesVisitedArr);
  }
  showPlaces(){
    if(this.placeCounter >= this.travelArr.length){return}
    this.showPlacePromise((this.placeCounter)*2000).then(()=>{
      this.lastPlaceShow = this.currentPlaceShow;
      this.currentPlaceShow = {
        type: this.travelArr[this.placeCounter].type,
        name: this.travelArr[this.placeCounter].name
      }
      this.placeCounter++;
      // this.showPlaces();
    })
  }
  showPlacePromise(time){
    return new Promise<void>((res)=>{
      setTimeout(()=>{
        return res();
      // },500)
      },0)
    })
  }

}
