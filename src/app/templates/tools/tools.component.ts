import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ColorEvent } from 'ngx-color';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @Output() quickColorEvent = new EventEmitter<string>();
  @Output() colorPick = new EventEmitter<string>();
  @Output() shiftEmit = new EventEmitter<string>();
  @Input() gridSize;
  @Input() customColor;

  showTips = false;
  colorOption = 'single';
  //customColor = "#00c3ff";
  colorArray = [
    "#ffffff"
  ];

  constructor() { }

  ngOnInit() {

  }

  colorChanged($event: ColorEvent){
    this.customColor = $event.color.hex;
    this.colorPick.emit(this.customColor);
  }

  checkColorArr(){
    var index = Array.prototype.indexOf.call(this.colorArray, this.customColor);
    if(index == -1){
      this.colorArray.push(this.customColor);
      this.colorArray = this.colorArray;
    }
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
      targetElement.style.backgroundColor = "rgb(255, 255, 255)";
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
    var obj = this.hexToRgbObj(hex);
    return "rgb(" + obj.r + ", " + obj.g + ", " + obj.b + ")"
  }
  quickColorClick(color){
    this.customColor = color;
    this.colorPick.emit(this.customColor);
  }
  shiftLeft(){
    this.shiftEmit.emit("left");
  }
  shiftRight(){
    this.shiftEmit.emit("right");
  }
  shiftUp(){
    this.shiftEmit.emit("up");
  }
  shiftDown(){
    this.shiftEmit.emit("down");
  }
  clearBoard(){
    for(let x = 0; x < this.gridSize*this.gridSize; x++){
      var elm = document.getElementById('gridId'+x)
      elm.style.backgroundColor = "#ffffff";
    }
  }

}
