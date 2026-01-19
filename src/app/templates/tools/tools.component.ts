import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ColorEvent } from 'ngx-color';

declare var EXIF: any;
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
    "#ffffff",
    "#000000"
  ];
  uploadImage;

  constructor() { }

  ngOnInit() {

    var that = this;
    this.uploadImage = undefined;
      document.querySelector('input[type="file"]').addEventListener('change', function() {
          if (this.files && this.files[0]) {
              var img:any = document.querySelector('img');
              img.src = URL.createObjectURL(this.files[0]);
              img.onload = imageIsLoaded;
              that.uploadImage = img;
          }
      });
    function imageIsLoaded() {
      that.tryimage();
    }
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
      targetElement.style.backgroundColor = "";
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
  addImage(){

  }

  tryimage() {
    var img = new Image();
    var that = this;
    var srcOrientation;
    img.onload = function() {
      EXIF.getData(this, function(){
        srcOrientation = EXIF.getTag(this, 'Orientation');
        that.checkOrientation(srcOrientation, img);
      })
    };
    let src:any = this.uploadImage;
    console.log(src)
    src = src.src;
    img.src = src;​
  }
  checkOrientation(srcOrientation, img){
    var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");
    // set proper canvas dimensions before transform & export
    if (4 < srcOrientation && srcOrientation < 9) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }
    // transform context before drawing image
    console.log({srcOrientation})
    switch (srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height, width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }
    // draw image
    ctx.drawImage(img, 0, 0);
    this.drawPixels(ctx, height, width);
  }


  drawPixels(ctx, h, w){
    let dataArr = [];
    let total = 0
    let pixelArr = ctx.getImageData(0, 0, w, h).data;
    let sample_size = Math.floor(h/this.gridSize);
    let sample_size_w = Math.floor(w/this.gridSize);

    var yCount = 0;
    var xCount = 0;

    for (let y = 0; y < h; y += sample_size) {
      if(yCount < this.gridSize){
        yCount++;
      }
      xCount = 0;
      let xdataArr = [];
      for (let x = 0; x < w; x += sample_size_w) {
        if(xCount < this.gridSize){
          // dataArr.push(rgb);
          total++
          xCount++;
        }

        let p = (x + (y*w)) * 4;
        var rgb = "rgb(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + ")";

        let grid;
        if(yCount % 2){
          grid = (this.gridSize * this.gridSize) - (this.gridSize * yCount) + xCount - 1;
        } else {
          grid = (this.gridSize * this.gridSize) - total;
        }
        let td = document.getElementById('gridId'+grid);
        if(td){
          td.style.backgroundColor = rgb;
          td.setAttribute('data-total', total.toString());
          td.setAttribute('data-x', xCount.toString());
          td.setAttribute('data-y', yCount.toString());
        }
      }
    }
  }

}
