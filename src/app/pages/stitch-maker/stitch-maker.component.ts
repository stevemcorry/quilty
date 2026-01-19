import { Component } from '@angular/core';

@Component({
  selector: 'app-stitch-maker',
  templateUrl: './stitch-maker.component.html',
  styleUrls: ['./stitch-maker.component.scss']
})
export class StitchMakerComponent {
  x = 10;
  y = 10;
  grid: boolean[][] = [];

  constructor() {
    this.createGrid();
  }

  createGrid() {
    this.grid = Array.from({ length: this.y }, () =>
      Array.from({ length: this.x }, () => false)
    );
  }

  onCellClick(row: number, col: number) {
    this.grid[row][col] = !this.grid[row][col];
  }
}
