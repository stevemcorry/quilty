import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {


  @Input() executeArray;
  @Input() gridSize;
  @Input() delayTime;

  constructor() { }

  ngOnInit() {
  }


  addDelay(){
    let executeObj = {
      type: "delay",
      data: this.delayTime
    }
    this.executeArray.push(executeObj);
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
    let executeObj = {
      type: "pattern",
      data: colorArr
    }
    this.executeArray.push(executeObj);
    
    this.addDelay();
  }


}
