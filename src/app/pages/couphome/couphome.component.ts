import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameServiceService } from 'src/app/services/game-service.service';
import { AlertyComponent } from 'src/app/templates/alerty/alerty.component';

@Component({
  selector: 'app-couphome',
  templateUrl: './couphome.component.html',
  styleUrls: ['./couphome.component.scss']
})
export class CouphomeComponent implements OnInit {

  username = "";
  gameCode;

  @ViewChild(AlertyComponent, {static:false}) alerty: AlertyComponent;

  constructor(
    private router: Router,
    private gameService: GameServiceService
    ) { }

  ngOnInit() {
  }

  startGame(){
    if(this.username != ""){
      var randomCode = Math.floor(1000 + (9999 - 1000) * Math.random());
      var game = this.gameCode ? this.gameCode : randomCode;
      if(!this.gameCode){
        document.cookie = "username="+this.username;
        document.cookie = "gameCode="+game;
        this.gameService.newGame(game, {name: this.username});
        this.router.navigate(['/coup/' + game, { nerdplayingthisgame: this.username }]);
      } else{
        this.checkGameExists(game);
      }
    } else {
      this.alerty.openAlert('Username is required.');
    }
  }

  checkGameExists(game){
    //check if game exists
    var gameSubscription = this.gameService.getGame(game).subscribe((res:any)=>{
      gameSubscription.unsubscribe();
      if(res){
        this.checkUsernameExists(game, res);
      }else{
        this.alerty.openAlert("This game doesn't exist. Please check game the code.")
      }
    })
  }

  checkUsernameExists(gameId, game){
    // check if username exists
      console.log(game, "players")
      var res = game.players
      if(res.length > 5 ){
        this.alerty.openAlert('This game is full. You can join but will not be able to play');
        document.cookie = "username=''";
        this.router.navigate(['/coup/' + gameId]);
        return;
      }
      if(game.started){
        this.alerty.openAlert('This game has started. You can join but will not be able to play');
        this.router.navigate(['/coup/' + gameId]);
        return;
      }
      for(let player of res){
        if(player.name == this.username){
          this.alerty.openAlert('username already exists in this game');
          return;
        }
      }
      document.cookie = "username="+this.username;
      document.cookie = "gameCode="+gameId;
      this.gameService.addPlayer(gameId, this.username)
      this.router.navigate(['/coup/' + gameId, { nerdplayingthisgame: this.username }]);
  }

}
