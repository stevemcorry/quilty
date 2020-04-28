import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-js-collision',
  templateUrl: './js-collision.component.html',
  styleUrls: ['./js-collision.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsCollisionComponent implements OnInit {


  gravity = false;
  allDots = [];
  constructor() { }

  ngOnInit() {    
    var that = this;
    document.getElementById('collide-area').addEventListener("click", printMousePos);
    function printMousePos(event) {
      that.placeDiv(event.clientX, event.clientY);
    }

    // document.getElementById('inner-dot').addEventListener("click", printMousePos);
    // function printMousePos(event) {
    //   that.placeDiv(event.clientX, event.clientY);
    // }

    
  }

  placeDiv(x_pos, y_pos) {
    var d = document.createElement('div');
    var parent = document.getElementById('collide-area');
    var rect:any = parent.getBoundingClientRect();
    x_pos = x_pos - rect.x - 5;
    y_pos = y_pos - rect.y - 5;
    var dotty = new Dot(parent, x_pos, y_pos);
    this.allDots.push(dotty);
    if(this.gravity){
      dotty.addGravity();
    }
  }

  clearDots(){
    var parent = document.getElementById('collide-area');
    var child = parent.lastElementChild;  
    while (child) { 
        parent.removeChild(child); 
        child = parent.lastElementChild; 
    } 
  }
  addGravity(elm){

    var parent = document.getElementById('collide-area');
    var rect = parent.getBoundingClientRect();
    var pos = parseInt(elm.style.top);
    for(var x = rect.height - pos - 10; x >= 0; x--){
      setTimeout(()=>{
        var pos2 = parseInt(elm.style.top);
        elm.style.top = (pos2 + 1) + "px";
      },this.getGravity(x+1));
    }
  }
  getGravity(time){
    var g =  9.81/(time*time);
    // return time;
    return g;
  }

  syncWait(ms){
    const end = Date.now() + ms
    while (Date.now() < end) continue
  }

  turnOnGravity(){
    for(let dot of this.allDots){
      dot.addGravity();
    }
  }

}


class Dot {
  element: HTMLElement;
  parent: HTMLElement;
  x;
  y;
  constructor(parent: HTMLElement, x_pos, y_pos) {
    this.x = x_pos;
    this.y = y_pos;
    this.element = document.createElement('div');
    this.element.classList.add('collider')
    this.element.style.position = "absolute";
    this.element.style.left = x_pos+'px';
    this.element.style.top = y_pos+'px';
    this.parent = parent;
    this.parent.appendChild(this.element);
  }
  update() {
    this.element.style.top = this.y + "px";
  }
  addGravity(){
    var rect = this.parent.getBoundingClientRect();
    for(var i = rect.height - this.y - 10; i >= 0; i--){
      setTimeout(()=>{
        var pos2 = parseInt(this.y);
        this.y = (pos2 + 1);
        this.update();
      },i);
    }
  }
}
