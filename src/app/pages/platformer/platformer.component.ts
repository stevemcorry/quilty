import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-platformer',
  templateUrl: './platformer.component.html',
  styleUrls: ['./platformer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlatformerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var player = new Player(0,0,30,30);
    var wall1 = new Walls(50, 0, 200, 50);
  }

 collision(r1, r2) {
    if (r1.x_pos + r1.width > r2.x_pos &&
        r1.x_pos < r2.x_pos + r2.width &&
        r2.y_pos + r2.height > r1.y_pos &&
        r2.y_pos < r1.y_pos + r1.height) {
          return true;
    } else {
      return false;
    }
  };

}

class Player {

  x_pos; 
  y_pos; 
  width; 
  height;
  element;

  constructor(x_pos, y_pos, width, height) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = height;
    this.addPlayer();
  }
  addPlayer(){
    this.element = document.createElement('div');
    this.element.classList.add('player');
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    this.element.style.bottom = this.y_pos + "px";
    this.element.style.left = this.x_pos + "px";
    document.getElementById('game-area').appendChild(this.element);
  }
  collision(r1, r2) {
    if (r1.x + r1.w > r2.x &&
        r1.x < r2.x + r2.w &&
        r2.y + r2.h > r1.y &&
        r2.y < r1.y + r1.h) {
          return true;
    } else {
      return false;
    }
  };

}

class Walls {

  x_pos; 
  y_pos; 
  width; 
  height;
  element;

  constructor(x_pos, y_pos, width, height) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = height;
    this.drawWall();
  }
  drawWall(){
    this.element = document.createElement('div');
    this.element.classList.add('wall');
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    this.element.style.bottom = this.y_pos + "px";
    this.element.style.left = this.x_pos + "px";
    document.getElementById('game-area').appendChild(this.element);
  }
  collision(r1, r2) {
    if (r1.x + r1.w > r2.x &&
        r1.x < r2.x + r2.w &&
        r2.y + r2.h > r1.y &&
        r2.y < r1.y + r1.h) {
          return true;
    } else {
      return false;
    }
  };

}