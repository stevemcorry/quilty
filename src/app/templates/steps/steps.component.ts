import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import html2canvas from "html2canvas"


@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {


  @Input() executeArray;
  @Input() gridSize;
  @Input() delayTime;
  @Output() editEmit = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  editStep(step){
    this.editEmit.emit(step.data);
  }
  addStep(){
    var colorArr = [];
    for(let x = 0; x < this.gridSize*this.gridSize; x++){
      var td = document.getElementById('gridId' + x);
      // let stringy = "LEDCell(" + x + "," + td.style.backgroundColor + ")";
      // colorArr.push(stringy);
      var obj = {
        id: x,
        color: td.style.backgroundColor
      };
      colorArr.push(obj);
    }
    // let executeObj = {
    //   type: "pattern",
    //   data: colorArr,
    //   delay: this.delayTime
    // }
    // this.executeArray.push(executeObj);
    
    this.pdfDownload(colorArr);
  }
  pdfDownload(colorArr) {
    var scroll = window.scrollY;
    console.log(scroll);
    window.scrollTo(0,0)
    html2canvas(document.querySelector('#grid-table')).then(canvas => {
        var imgData = canvas.toDataURL("image/png");

        let executeObj = {
          data: colorArr,
          delay: this.delayTime,
          img: imgData
        }
        this.executeArray.push(executeObj);

        window.scrollTo(0,scroll)
        // document.getElementById('steps').appendChild(canvas);
    });
  }


}
