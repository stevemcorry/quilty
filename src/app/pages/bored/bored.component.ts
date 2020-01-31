import { Component, OnInit } from '@angular/core';
import { JokesService } from 'src/app/services/jokes.service';

@Component({
  selector: 'app-bored',
  templateUrl: './bored.component.html',
  styleUrls: ['./bored.component.scss']
})
export class BoredComponent implements OnInit {

  joke:any = {};
  activity:any = {};
  drink:any = {};
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  constructor(
    private jokeService: JokesService,
  ) { }

  ngOnInit() {
    this.jokeService.getJoke().subscribe(res=>{
      this.joke = res;
    })
    this.jokeService.getActivity().subscribe(res=>{
      this.activity = res;
    })
    this.jokeService.getDrink().subscribe(res=>{
      this.drink = res;
      this.drink = this.drink.drinks[0];
      console.log(this.drink, 'drink');
    })
  }

}
