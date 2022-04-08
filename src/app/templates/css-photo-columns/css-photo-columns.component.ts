import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-css-photo-columns',
  templateUrl: './css-photo-columns.component.html',
  styleUrls: ['./css-photo-columns.component.scss']
})
export class CssPhotoColumnsComponent implements OnInit {

  activePanel = 0;
  constructor() { }

  ngOnInit() {
  }

}
