import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-intro-animation',
  templateUrl: './intro-animation.component.html',
  styleUrls: ['./intro-animation.component.scss']
})
export class IntroAnimationComponent implements OnInit, AfterViewInit {

  @ViewChild('introAnimation') intro: ElementRef; 
  @Input() text = "";
  @Input() delay = 0;
  @Input() deleteDelay = 0;
  @Input() delete = false;
  textArr = [];
  constructor() { }

  ngOnInit() {
    this.textArr = this.text.split('');
  }
  ngAfterViewInit() {
    var children = this.intro.nativeElement.children;
    for(let i = 0; i < children.length; i++){
      this.addClass(children[i], ((i+1) *100) + this.delay);
    }

    if(this.delete){
      for(let i = children.length - 1; i >= 0; i--){
        this.removeClass(children[i], (((children.length - i+1) *100) + this.delay) + this.deleteDelay);
      }
    }
  }

  addClass(element, delay){
    setTimeout(()=>{
      element.classList.add('active')
    },delay)
  }

  removeClass(element, delay){
    setTimeout(()=>{
      element.classList.remove('active')
    },delay)
  }

}
