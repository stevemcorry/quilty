import { Component, OnInit, Input } from '@angular/core';
import { GridAnimationObj } from 'app/models/gridAnimation.model';
import { GridService } from 'app/services/grid.service';
import { MessagesService } from 'app/services/messages.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  @Input() gridSize = 21;
  @Input() executeArray;
  savedPatterns = [];
  sleeptime = 300;
  selectedPattern;
  selectedName;
  selectedImg;
  selectedDelay = 500;
  selectedBrightness = 20;
  mainName;
  mainImg;
  loadingSavedPatterns = false;

  constructor(private messageService: MessagesService,
    private gridService: GridService) { }

  ngOnInit() {
    this.getSavedDesigns();
    this.messageService.getMainCheck().subscribe((res:any)=>{
      console.log(res)
      this.selectedBrightness = res.brightness;
      this.selectedDelay = res.delay;
      this.mainName = res.name;
      this.mainImg = res.img
    })
  }

  getSavedDesigns(){
    console.log('getting saved')
    if(this.loadingSavedPatterns){return}
    this.loadingSavedPatterns = true;
    this.gridService.items.subscribe((gridItems)=>{
      console.log({gridItems})
    })
  }
  // forBoard(arr){
  //   var stringy = ""
  //   for(let x of arr){
  //     if(x.type == "pattern"){
  //       for(let i of x.data){
  //         let splt = i.color.substring(3);
  //         let plz = splt.split(', ');
  //         plz[0] = plz[0].substring(1)
  //         plz[2] = plz[2].substring(0, plz.length);
  //         var hex = "0x" + this.fullColorHex(plz[0].substring(1,3),plz[1], plz[2]);
  //         // let srng = "leds["+ i.id +"] = CHSV " + splt + ";";
  //         let srng = "leds["+ i.id +"] = " + hex + ";";
  //         stringy += srng;
  //       }
  //       stringy += "FastLED.show();";
  //     } else {
  //       stringy += "delay(" + x.data + ");";
  //     }
  //   }
  // }
  rgbToHex(rgb){ 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  }
  fullColorHex(r,g,b) {   
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return red+green+blue;
  };

  showDemo(){
    setTimeout(()=>{
      this.playOnDemoGrid(this.executeArray)
    },300)
  }

  async playOnDemoGrid(arr){
    this.makeGrid(document.getElementById('demo-table'), "Demo");
    for(let x of arr){
      // await this.timer(x.data);
      await this.sleep(this.sleeptime).then(v => this.executeFunction(x.data))

    }
  }
  async timer(data){
    return this.sleep(this.sleeptime).then(v => this.executeFunction(data))
  }
  sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  makeGrid(table, demo){
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
    for (let y = 0; y < this.gridSize; y++) {
      var row = document.createElement("div");
      row.setAttribute("id", "rowId" + demo + y);
      row.setAttribute("class", "grid-row");
      row.style.height = (100/this.gridSize) + "%";
      table.prepend(row);
      for (let x = 0; x < this.gridSize; x++) {
        var td = document.createElement("div");
        td.style.width = (100/this.gridSize) + "%";
        td.classList.add('individual-cell');
        var place = ((y*this.gridSize)+x);
        td.setAttribute("id", "gridId" + demo + place);
        if(this.isEven(y)){
          row.appendChild(td);
        } else {
          row.prepend(td);
        }
      }
    }
  }
  playSavedPattern(pattern){
    let arr = pattern.steps;
    this.selectedPattern = pattern.steps;
    this.selectedName = pattern.name;
    this.selectedImg = pattern.img;
    console.log(pattern)
    setTimeout(()=>{
      for(let x of arr){
        if(this.gridSize*this.gridSize != x.data.length){
          this.gridSize = Math.sqrt( x.data.length );
          this.makeGrid(document.getElementById('demo-table'), "");
          this.playOnDemoGrid(arr);
        } else {
          this.playOnDemoGrid(arr);
        }
        break;
      }
    },300)
  }
  isEven(value) {
    if (value%2 == 0)
      return true;
    else
      return false;
  }

  executeFunction(data){
    for(let x in data){
      if(data[x].id || data[x].id === 0){
        var grid = document.getElementById('gridIdDemo' + data[x].id);
        grid.style.backgroundColor = data[x].color;
      } else{
        var grid = document.getElementById('gridIdDemo' + x);
        grid.style.backgroundColor = data[x].color;
      }
    }
  }
  updateMain(){
    let obj = {
      brightness: this.selectedBrightness,
      delay: this.selectedDelay,
      img: this.mainImg,
      name: this.mainName
    }
    this.messageService.updateMainPattern(obj);
  }
  setMain(){
    let data = this.selectedPattern.slice(0);
    let newJson = [];
    for(let step of data){
      if(step.data){
        let mainData:any = [];
        let unshiftData = [];
        for( let index = 0; index < step.data.length; index++){
          let indata = step.data[index];
          delete indata.id;
          if(indata.color == ''){indata.color = "rgb(0, 0, 0)"}
          if(this.selectedName == "Seeds of doubt" && indata.color == "rgb(255, 255, 255)"){indata.color = "rgb(0, 0, 0)"}
          if(this.isEven(Math.floor(index/this.gridSize))){
            unshiftData.unshift(indata.color);
          } else{
            unshiftData.unshift(indata.color);
          }
          if(unshiftData.length == 21){
            mainData = mainData.concat(unshiftData);
            unshiftData = [];
          }
        }
        mainData = mainData.join('');
        mainData = mainData.replaceAll('rgb(', "");
        mainData = mainData.split(')');
        newJson.push(mainData);
      }
    }
    let obj = {
      name : this.selectedName,
      delay : this.selectedDelay,
      brightness: this.selectedBrightness,
      img: this.selectedImg
    }
    this.messageService.setMainPattern(newJson, obj);
  }

  resavePatterns(patterns){
    patterns.forEach(element => {
      // console.log(element)
      if(element.steps[0].img){
        let obj = new GridAnimationObj(element.name, element.steps[0].img, element.steps);
        // console.log({obj});
        this.messageService.updatePattern(element.key, obj);
      } else{
        let obj = new GridAnimationObj(element.name, element.img, element.steps);
        // console.log(2, {obj});
        this.messageService.updatePattern(element.key, obj);
      }
    });
  }

}
