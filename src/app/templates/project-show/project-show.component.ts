import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.scss']
})
export class ProjectShowComponent implements OnInit {

  @Input() projectDescription = "";
  @Input() picture = "";
  @Input() projectRotation = 0;
  turnOnProject = false;
  imageActive = false;

  constructor() { }

  ngOnInit() {
  }

}
