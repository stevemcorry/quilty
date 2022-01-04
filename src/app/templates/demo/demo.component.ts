import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

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
  selectedDelay = 100;
  selectedBrightness = 100;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.getSavedDesigns();
  }

  getSavedDesigns(){
    this.messageService.getPatterns().subscribe(res=>{
      this.savedPatterns = res;
      this.forBoard(res[3].steps)
    })
  }
  forBoard(arr){
    var stringy = ""
    for(let x of arr){
      if(x.type == "pattern"){
        for(let i of x.data){
          let splt = i.color.substring(3);
          let plz = splt.split(', ');
          plz[0] = plz[0].substring(1)
          plz[2] = plz[2].substring(0, plz.length);
          var hex = "0x" + this.fullColorHex(plz[0].substring(1,3),plz[1], plz[2]);
          // let srng = "leds["+ i.id +"] = CHSV " + splt + ";";
          let srng = "leds["+ i.id +"] = " + hex + ";";
          stringy += srng;
        }
        stringy += "FastLED.show();";
      } else {
        stringy += "delay(" + x.data + ");";
      }
    }
  }
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
  setMain(){
    let data = this.selectedPattern.slice(0);
    let newJson = [];
    for(let step of data){
      if(step.data){
        let mainData:any = [];
        for( let indata of step.data){
          delete indata.id;
          if(indata.color == ''){indata.color = "rgb(0, 0, 0)"}
          mainData.push(indata.color);
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
      brightness: this.selectedBrightness
    }
    this.messageService.setMainPattern(newJson, obj);
  }

}
