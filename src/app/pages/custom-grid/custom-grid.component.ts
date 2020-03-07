import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { ToolsComponent } from 'src/app/templates/tools/tools.component';
import { MessagesService } from 'src/app/services/messages.service';
import { StepsComponent } from 'src/app/templates/steps/steps.component';


@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomGridComponent implements OnInit {

  @ViewChild(ToolsComponent, {static: false}) toolsComp:ToolsComponent;
  @ViewChild(StepsComponent, {static: false}) stepsComp:StepsComponent;
  customColor = "#00c3ff";
  gridSize = 7;
  delayTime = 100;
  patternName = "";
  colorArray = [];
  savedPatterns = [];
  executeArray = [];

  mouseDown = 0;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    var index = Array.prototype.indexOf.call(document.getElementById('saveDesignModal').classList, "show");
    if(index != -1){return}
    switch(event.key){
      case "d":
        this.stepsComp.addDelay();
        break;
      case "s":
        this.stepsComp.addStep();
        break;
    }
  }

  constructor(
    private messageService: MessagesService
  ) { 
    var that = this;
    document.body.onmousedown = function() { 
      that.mouseDown = 1;
    }
    document.body.onmouseup = function() {
      that.mouseDown = 0;
    }

  }

  ngOnInit() {
    this.makeGrid(document.getElementById('grid-table'), "");
    this.getSavedDesigns();
  }

  makeGridButton(){
    this.toolsComp.gridSize = this.gridSize;
    this.makeGrid(document.getElementById('grid-table'), "");
  }
  colorChanged(){
    this.toolsComp.customColor = this.customColor;
  }
  colorGrid(){
    var targetElement:any = event.target || event.srcElement;
    this.checkColorArr();
    switch(this.toolsComp.colorOption){
      case 'single':
        this.toolsComp.colorSingleCell(targetElement);
        break;
      case 'col':
        var index = Array.prototype.indexOf.call(targetElement.parentElement.children, targetElement);
        this.toolsComp.colorWholeColumn(index);
        break;
      case 'row':
        this.toolsComp.colorWholeRow(targetElement.parentElement.childNodes);
        break;
      case 'board':
        this.toolsComp.colorWholeBoard();
        break;
      case 'backSlash':
        this.toolsComp.addBackSlash(targetElement);
        break;
      case 'forwardSlash':
        this.toolsComp.addForwardSlash(targetElement);
        break;
      case 'horizontal':
        this.toolsComp.addHorizontal(targetElement);
        break;
      case 'vertical':
        this.toolsComp.addVertical(targetElement);
        break;
    }
  }
  mouseOver(){
    var targetElement:any = event.target || event.srcElement;
    if(this.mouseDown){
      this.colorGrid();
      // this.toolsComp.colorSingleCell(targetElement);
    }
  }

  isEven(value) {
    if (value%2 == 0)
      return true;
    else
      return false;
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
        td.addEventListener('mousedown',this.colorGrid.bind(this), false);
        td.addEventListener('mouseover',this.mouseOver.bind(this), false);
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
  checkColorArr(){
    var index = Array.prototype.indexOf.call(this.colorArray, this.customColor);
    if(index == -1){
      this.colorArray.push(this.customColor);
      this.toolsComp.colorArray = this.colorArray;
    }
  }

  showDemo(){
    this.playOnDemoGrid(this.executeArray)
  }
  playSavedPattern(arr){
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
  executeFunction(data){
    for(let x of data){
      var grid = document.getElementById('gridIdDemo' + x.id);
      grid.style.backgroundColor = x.color;
    }
  }
  saveDesign(){
    this.messageService.addPattern(this.executeArray, this.patternName)
  }
  getSavedDesigns(){
    this.messageService.getPatterns().subscribe(res=>{
      this.savedPatterns = res;
      this.forBoard(res[3].steps)
    })
  }
  quickColorChange($event){
    this.customColor = $event;
    this.toolsComp.customColor = this.customColor;
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
  shiftGrid(direction){

    var table = document.getElementById('grid-table');
    var children = table.childNodes;
    var lastCol = [];

    if(direction == "left"){

      for(let x  = 0; x < this.gridSize; x++){
        for(let i = 0; i < this.gridSize; i++){
          var nodey:any = children[i].childNodes[x];
          if(x == 0){
            lastCol.push(nodey.style.backgroundColor);
            var nodey2: any = children[i].childNodes[x+1];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          } 
          else if(x == this.gridSize -1){
            nodey.style.backgroundColor = lastCol[i];
          } 
          else {
            var nodey2: any = children[i].childNodes[x+1];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          }
        }
      }

    } else {

      for(let x  = 0; x < this.gridSize; x++){
        for(let i = this.gridSize-1; i > 0; i--){
          var nodey:any = children[i].childNodes[x];
          if(x == this.gridSize -1){
            lastCol.push(nodey.style.backgroundColor);
            var nodey2: any = children[i].childNodes[x-1];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          } 
          else if(x == 0){
            nodey.style.backgroundColor = lastCol[i];
          } 
          else {
            var nodey2: any = children[i].childNodes[x-1];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          }
        }
      }

    }
  }






}









/*
while its still on my mind for the quilting idea:

custom pattern, with step by step instructions




*/