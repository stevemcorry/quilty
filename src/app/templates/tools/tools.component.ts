import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @Output() quickColorEvent = new EventEmitter<string>();
  @Output() shiftEmit = new EventEmitter<string>();
  
  colorOption = 'single';
  customColor = "#00c3ff";
  gridSize = 7;
  colorArray = [];

  constructor() { }

  ngOnInit() {

  }


  addForwardSlash(targetElement){
    targetElement.classList = "individual-cell";
    targetElement.classList.add("forward-slash");
  }
  addBackSlash(targetElement){
    targetElement.classList = "individual-cell";
    targetElement.classList.add("back-slash");
  }
  addHorizontal(targetElement){
    targetElement.classList = "individual-cell";
    targetElement.classList.add("horizontal-split");
  }
  addVertical(targetElement){
    targetElement.classList = "individual-cell";
    targetElement.classList.add("vertical-split");
  }
  colorSingleCell(targetElement){
    if(targetElement.style.backgroundColor == this.hexToRgb(this.customColor)){
      // targetElement.style.backgroundColor = "rgb(255, 255, 255)";
    } else {
      targetElement.style.backgroundColor = this.customColor;
    }
  }
  colorWholeRow(elements){
    for(let x of elements){
      x.style.backgroundColor = this.customColor;
    }
  }
  colorWholeColumn(cellIndex){
    var table = document.getElementById('grid-table');
    var children = table.childNodes;
    for(let i = 0; i < this.gridSize; i++){
      var nodey:any = children[i].childNodes[cellIndex];
      nodey.style.backgroundColor = this.customColor;
    }
  }
  colorWholeBoard(){
    for(let x = 0; x < this.gridSize*this.gridSize; x++){
      var elm = document.getElementById('gridId'+x)
      elm.style.backgroundColor = this.customColor;
    }
  }
  hexToRgbObj(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  hexToRgb(hex) {
    var obj = this.hexToRgbObj(hex)
    return "rgb(" + obj.r + ", " + obj.g + ", " + obj.b + ")"
  }
  quickColorClick(color){
    this.quickColorEvent.emit(color);
  }
  shiftLeft(){
    this.shiftEmit.emit("left");
  }
  shiftRight(){
    this.shiftEmit.emit("right");
  }

}
