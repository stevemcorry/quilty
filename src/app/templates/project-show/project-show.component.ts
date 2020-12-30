import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.scss']
})
export class ProjectShowComponent implements OnInit {

  @Input() projectDescription = "";
  @Input() projectTitle = "";
  @Input() picture = "";
  @Input() projectRotation = 0;
  @Input() projectURL = "";
  @Output() projectClick = new EventEmitter;
  turnOnProject = false;
  imageActive = false;

  constructor() { }

  ngOnInit() {
  }
  openProject(){
    let obj = {
      projectDescription: this.projectDescription,
      projectTitle: this.projectTitle,
      picture: this.picture,
      url: this.projectURL
    }
    console.log(obj,'obkj')
    this.projectClick.emit(obj)
  }

}
