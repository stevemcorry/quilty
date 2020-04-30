import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  gridSize = 7;
  savedPatterns = [];
  @Input() executeArray;

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
    console.log(stringy);
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
  playOnDemoGrid(arr){
    this.makeGrid(document.getElementById('demo-table'), "Demo");
    var totalTime = 0;
    for(let x of arr){
      if(x.type == "pattern"){
        setTimeout(()=>{
          this.executeFunction(x.data)
        }, totalTime);
      } else{
        totalTime = totalTime + x.data;
      }
    }
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
  playSavedPattern(arr){
    setTimeout(()=>{
      for(let x of arr){
        if(x.type == "pattern"){
          if(this.gridSize*this.gridSize != x.data.length){
            this.gridSize = Math.sqrt( x.data.length );
            this.makeGrid(document.getElementById('grid-table'), "");
            this.playOnDemoGrid(arr);
          } else {
            this.playOnDemoGrid(arr);
          }
          break;
        }
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
    for(let x of data){
      var grid = document.getElementById('gridIdDemo' + x.id);
      grid.style.backgroundColor = x.color;
    }
  }

}
