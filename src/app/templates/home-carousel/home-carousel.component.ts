import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {

  @ViewChild('htmlAnimation') intro: ElementRef; 
  text = `<html>*_<div class="container">*__<div class="row">*___<div class="col-auto">*____<h1>Sick bootstrap bro</h1>*___</div>*__</div>*_</div>*</html>`
  textArr = [];
  skillsHover:boolean = false;
  highlightHtml:boolean = false;
  removeHtml:boolean = false;

  constructor() { }

  ngOnInit() {
    this.textArr = this.text.split('');
  }

  ngAfterViewInit() {
    this.startText();

    // if(this.delete){
    //   for(let i = children.length - 1; i >= 0; i--){
    //     this.removeClass(children[i], (((children.length - i+1) *100) + this.delay) + this.deleteDelay);
    //   }
    // }
  }

  async startText(){
    var children = this.intro.nativeElement.children;
    for(let i = 0; i < children.length; i++){
      this.addClass(children[i], ((i+1) *50));
      if(i == children.length-1){
        await this.timeout(((i+1) *50));
          this.skillsHover = true;
        await this.timeout(3000);
          this.highlightHtml = true;
      }
    }
    this.removeHtml = true;
  }
  
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addClass(element, delay){
    setTimeout(()=>{
      element.classList.add('active')
    },delay)
  }

  // removeClass(element, delay){
  //   setTimeout(()=>{
  //     element.classList.remove('active')
  //   },delay)
  // }

}
