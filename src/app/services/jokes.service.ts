import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokesService {


  jokeUrl = "https://official-joke-api.appspot.com/jokes/random";
  activityUrl = "https://www.boredapi.com/api/activity";
  drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  constructor(
    private http: HttpClient,
  ) { 

  }

  getJoke (){
    return this.http.get(this.jokeUrl);
  }
  getActivity (){
    return this.http.get(this.activityUrl);
  }
  getDrink (){
    return this.http.get(this.drinkUrl);
  }



}
