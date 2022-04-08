import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { ToolsComponent } from 'src/app/templates/tools/tools.component';
import { MessagesService } from 'src/app/services/messages.service';
import { StepsComponent } from 'src/app/templates/steps/steps.component';
import { DemoComponent } from 'src/app/templates/demo/demo.component';

// import { ColorEvent } from 'ngx-color';


@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomGridComponent implements OnInit {

  @ViewChild(ToolsComponent) toolsComp:ToolsComponent;
  @ViewChild(StepsComponent) stepsComp:StepsComponent;
  @ViewChild(DemoComponent) demoComp:DemoComponent;
  customColor = "#00ccff";
  gridSize = 21;
  delayTime = 100;
  patternName = "";
  colorArray = [
    "#ffffff"
  ];
  oldFrame = [];
  // savedPatterns = [];

  matrix = [];
  executeArray = [];

  mouseDown = 0;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    var index = Array.prototype.indexOf.call(document.getElementById('saveDesignModal').classList, "show");
    if(index != -1){return}
    switch(event.key){
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
    this.customColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    // this.getSavedDesigns();
  }

  makeGridButton(){
    this.toolsComp.gridSize = this.gridSize;
    this.makeGrid(document.getElementById('grid-table'), "");
  }
  colorChanged($event){
    this.customColor = $event.color.hex;
  }
  colorGrid(){
    this.stepsComp.oldBoard = [];
    this.stepsComp.activeStep = null;
    var targetElement:any = event.target || event.srcElement;
    this.toolsComp.checkColorArr();
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
    this.willCheck();
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
    for(var y=0; y<this.gridSize; y++) {
      var row = document.createElement("div");
      row.setAttribute("id", "rowId" + demo + y);
      row.setAttribute("class", "grid-row");
      row.style.height = (100/this.gridSize) + "%";
      table.prepend(row);
      this.matrix[y] = [];
      for(var x=0; x<this.gridSize; x++) {
          this.matrix[y][x] = undefined;
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
  // checkColorArr(){
  //   var index = Array.prototype.indexOf.call(this.colorArray, this.customColor);
  //   if(index == -1){
  //     this.colorArray.push(this.customColor);
  //     this.toolsComp.colorArray = this.colorArray;
  //   }
  // }
  executeFunction(data){
    for(let x of data){
      var grid = document.getElementById('gridId' + x.id);
      grid.style.backgroundColor = x.color;
    }
  }
  saveDesign(){
    this.messageService.addPattern(this.executeArray, this.patternName)
  }
  quickColorChange($event){
    this.customColor = $event;
    this.toolsComp.customColor = this.customColor;
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
  }
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

    } else if(direction == "right") {
      var firstNode;
      for(let x  = 0; x < this.gridSize; x++){
        for(let i = this.gridSize-1; i >= 0; i--){
          var nodey:any = children[x].childNodes[i];
          if(i == this.gridSize-1){
            firstNode = nodey.style.backgroundColor;
            var nodey2: any = children[x].childNodes[i-1];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          } else if(i == 0){
            nodey.style.backgroundColor = firstNode;
          } else {
            var nodey2: any = children[x].childNodes[i-1];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          }
        }
      }

    } else if(direction == "up"){
      const tempTop:any = children[0];
      let topRow = [];
      for(let x = 0; x < this.gridSize; x++){
        for(let i = 0; i < this.gridSize; i++){
          if(x==0){
            topRow.push(tempTop.childNodes[i].style.backgroundColor);
          }
          var nodey:any = children[x].childNodes[i];
          if(x == this.gridSize - 1){
            nodey.style.backgroundColor = topRow[i];
          } else {
            var nodey2: any = children[x+1].childNodes[i];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          }
        }
      }
    } else if(direction == "down"){
      const tempTop:any = children[this.gridSize-1];
      let bottomRow = [];
      for(let x = this.gridSize-1; x >= 0; x--){
        for(let i = 0; i < this.gridSize; i++){
          if(x == this.gridSize - 1){
            bottomRow.push(tempTop.childNodes[i].style.backgroundColor);
          }
          var nodey:any = children[x].childNodes[i];
          if(x == 0){
            nodey.style.backgroundColor = bottomRow[i];
          } else {
            var nodey2: any = children[x-1].childNodes[i];
            nodey.style.backgroundColor = nodey2.style.backgroundColor;
          }
        }
      }
    }

  }
  willCheck(){
    let gemArr = [45,39,37,29,31,33,26,24,22,15,17,19,11,9,3]
    let goodArr = [];
    for(let x = 0; x < this.gridSize*this.gridSize; x++){
      var grid = document.getElementById('gridId' + x).style.backgroundColor;
      if( grid != "" && grid != "rgb(255, 255, 255)" ){
        if(gemArr.indexOf(x) != -1){
          goodArr.push(x);
        } else {
          gemArr.splice(0);
        }
      }
    }
    if(goodArr.length == 15){
      alert('Have a watermellon');
    }
  }

  setMain(){
    this.demoComp.setMain();
  }
  showEdit(grid){
    if(grid.type == 'view'){ 
      this.executeFunction(grid.data);
    } else{
      this.executeFunction(grid.data);
    }
  }

}