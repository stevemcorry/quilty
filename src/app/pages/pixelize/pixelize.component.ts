import { Component, OnInit } from '@angular/core';

declare var EXIF: any;

@Component({
  selector: 'app-pixelize',
  templateUrl: './pixelize.component.html',
  styleUrls: ['./pixelize.component.scss']
})
export class PixelizeComponent implements OnInit {

  constructor() { 

  }

  gridCount = 7;
  uploadImage;
  showPixelButton = false;

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
      that.showPixelButton = true;
    }
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
    src = src.src;
    img.src = src;​
  }

  deleteTable(el){
    var table = el.srcElement.parentNode.parentNode;
    table.parentNode.removeChild(table);
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
    let pixelArr = ctx.getImageData(0, 0, w, h).data;
    let sample_size = Math.floor(h/this.gridCount);
    let sample_size_w = Math.floor(w/this.gridCount);
    var table = document.createElement("table");
    var getme = document.getElementById('getME');
    if(getme.firstChild){
      getme.removeChild(getme.firstChild);
    }
    table = getme.appendChild(table);
    table.addEventListener('click',this.deleteTable);
    var yCount = 0;
    var xCount = 0;
    for (let y = 0; y < h; y += sample_size) {
      var row = document.createElement("tr");
      if(yCount < this.gridCount){
        table.appendChild(row);
        yCount++;
      }
      xCount = 0;
      for (let x = 0; x < w; x += sample_size_w) {
        let p = (x + (y*w)) * 4;
        var rgba = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
        var td = document.createElement("td");
        td.height = "20px";
        td.width = "20px";
        td.style.backgroundColor = rgba;
        if(xCount < this.gridCount){
          row.appendChild(td);
          xCount++;
        }
      }
    }
  }


}
