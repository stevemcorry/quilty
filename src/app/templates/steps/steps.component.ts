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
  @Output() editEmit = new EventEmitter<any>();
  oldBoard = [];
  activeStep;

  constructor() { }

  ngOnInit() {
  }

  viewStep(step, i){
    if(!this.oldBoard[0]){
      this.oldBoard = this.getBoardArr();
    }
    this.activeStep = i;
    let obj = {
      type: 'view',
      data: step.data
    }
    this.editEmit.emit(obj);
    // this.editEmit.emit(step.data);
  }
  editStep(step){
    if(!this.oldBoard[0]){
      this.oldBoard = this.getBoardArr();
    }
    let obj = {
      type: 'edit',
      data: step.data
    }
    this.editEmit.emit(obj);
    // this.editEmit.emit(step.data);
  }  
  deleteStep(step, i){
    this.activeStep = null;
    if(!this.oldBoard[0]){
      this.oldBoard = this.getBoardArr();
    }
    this.executeArray.splice(i,1);
  }

  addStep(){

    var colorArr = this.getBoardArr();
    
    this.pdfDownload(colorArr);

  }
  pdfDownload(colorArr) {
    var scroll = window.scrollY;
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
  getBoardArr(){
    let colorArr = [];
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
    return colorArr;
  }
  continueOld(){
    let obj = { type: 'view', data: this.oldBoard }
    this.editEmit.emit(obj);
    this.oldBoard = [];
    this.activeStep = null;
  }


}
