import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-css-fun',
  templateUrl: './css-fun.component.html',
  styleUrls: ['./css-fun.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CssFunComponent implements OnInit, AfterViewInit {


  @ViewChild('svgboi') svgboi: ElementRef; 

  constructor() { }

  status = false;

  ngOnInit() {
  }

  ngAfterViewInit(){
    // this.addStitchPattern(this.svgboi.nativeElement);
    // console.log(this.svgboi)
    this.startStitching();
  }

  startStitching(){
    for(let x of this.svgboi.nativeElement.children){
      this.addStitchPattern(x);
    }
  }

  addStitchPattern(element){
    var dash = element.style.strokeDasharray;
    var dashArr = "10000px 5px 10000px",
    addStich = " 5px 5px";
    dash = dashArr;
    for(let i = 0; i < 35; i++){
      setTimeout(()=>{
        dash = dash + addStich;
        element.style.strokeDasharray = dash;
      }, i*100)
    }
  }

}
