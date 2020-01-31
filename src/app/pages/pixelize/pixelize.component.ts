import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-pixelize',
  templateUrl: './pixelize.component.html',
  styleUrls: ['./pixelize.component.scss']
})
export class PixelizeComponent implements OnInit {

  constructor() { }

  gridCount = 7;
  uploadImage;
  showPixelButton = false;

  ngOnInit() {
    console.log(this.gridCount)
    var that = this;
    window.addEventListener('load', function() {
      document.querySelector('input[type="file"]').addEventListener('change', function() {
          if (this.files && this.files[0]) {
              var img = document.querySelector('img');
              img.src = URL.createObjectURL(this.files[0]);
              img.onload = imageIsLoaded;
              that.uploadImage = img;
          }
      });
    });

    function imageIsLoaded() {
      that.showPixelButton = true;
    }

  }


  //image stuff

  tryimage(){
    console.log(this.uploadImage);
    let c = document.createElement("canvas");
    let image = new Image();
    var thiss = this;
    image.onload = function () {
      var w = image.width;
      var h = image.height;
      c.width = w;
      c.height = h;
      var ctx = c.getContext('2d');
      ctx.drawImage(image, 0, 0);
      var grid = thiss.gridCount;
      if(grid > 100){
        alert('To much grid.')
        return;
      }
      let pixelArr = ctx.getImageData(0, 0, w, h).data;
      let sample_size = Math.floor(h/grid);
      let sample_size_w = Math.floor(w/grid);
      var table = document.createElement("table")
      table = document.getElementById('getME').appendChild(table);
      table.addEventListener('click',thiss.deleteTable);
      for (let y = 0; y < h; y += sample_size) {
        var row = document.createElement("tr");
        table.appendChild(row);
        for (let x = 0; x < w; x += sample_size_w) {
          let p = (x + (y*w)) * 4;
          var rgba = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
          var td = document.createElement("td");
          td.height = "20px";
          td.width = "20px";
          td.style.backgroundColor = rgba;
          row.appendChild(td);
        }
      }
    };
    let src:any = this.uploadImage;
    src = src.src;
    image.src = src;​

  }
  deleteTable(table){
    console.log(table,'table')
    // table.parentNode.removeChild(table);
  }


}
