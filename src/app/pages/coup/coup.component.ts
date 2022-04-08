import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameServiceService } from 'src/app/services/game-service.service';
import { AlertyComponent } from 'src/app/templates/alerty/alerty.component';

@Component({
  selector: 'app-coup',
  templateUrl: './coup.component.html',
  styleUrls: ['./coup.component.scss']
})
export class CoupComponent implements OnInit, OnDestroy {

  characters = [
    {
      name: "Duke",
      count: 3
    },
    {
      name: "Captain",
      count: 3
    },
    {
      name: "Assassin",
      count: 3
    },
    {
      name: "Contessa",
      count: 3
    },
    {
      name: "Ambassador",
      count: 3
    },
  ];
  gameId;
  username;
  userPlayerObj = {
    name: "",
    card1: {
      name: "",
      isDead: false,
      assigned: false
    },
    card2: {
      name: "",
      isDead: false,
      assigned: false
    },
    myTurn: null,
    coins: 2
  };
  turn = 100;
  gameSub;
  players:PlayerObject[] = [];
  gameStarted = false;
  @ViewChild(AlertyComponent) alerty: AlertyComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameServiceService
    ) { }

  ngOnInit() {

    var cookieUser = "";
    var cookieGame = "";
    // var cookieUser = this.getCookie('username');
    // var cookieGame = this.getCookie('gameCode');
    this.username = cookieUser ? cookieUser : this.route.snapshot.paramMap.get('nerdplayingthisgame');
    this.gameId = cookieGame ? cookieGame : this.route.snapshot.params.id;
    this.getGame();

  }
  ngOnDestroy(){
    if(this.gameSub){
      this.gameSub.unsubscribe();
      console.log('unsubbed');
    }
  }

  getGame(){
    this.gameSub = this.gameService.getGame(this.gameId).subscribe((res:any)=>{
      console.log("Game: ",res);
      if(!res.started){
        this.setPlayers(res.players);
      } else{
        this.gameUpdated(res);
      }
    })
  }
  setPlayers(players){
    for(let x in players){
      var playerObj = new PlayerObject(players[x].name)
      if(this.username == players[x].name){
        this.userPlayerObj = playerObj;
      }
      this.players.push(playerObj);
    }
    console.log('players', this.players)
  }
  gameUpdated(data){
    this.gameStarted = true;
    this.players = data.players;
    this.turn = data.turn;
    for(let x in this.players){
      if(this.username == this.players[x].name){
        this.userPlayerObj = this.players[x];
        this.userPlayerObj.myTurn = x;
        console.log('setting', x)
      }
    }
    console.log(this.userPlayerObj, "user")
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  startGame(){
    if(this.players.length <= 1){
      alert("You need at least 2 players to start.");
      return;
    }
    for(let player of this.players){
      var card = this.getCard();
      var card2 = this.getCard();
      player.setCards(card, card2);
    }
    this.gameStarted = true;
    this.gameService.updatePlayers(this.gameId, this.players);
  }
  getCard(){
    var randomNum = Math.floor(0 + (5 - 0) * Math.random());
    var possibleChar = this.characters[randomNum];
    if(possibleChar.count > 0){
      possibleChar.count--;
      return possibleChar.name;
    } else{
      return this.getCard();
    }
  }
  takingAction = false;
  takeAction(action){
    if(this.takingAction){
      alert('plz wait.')
      return;
    }
    this.takingAction = true;
    switch(action){
      case ('one'):
        this.addCoins(1).then(()=>{
          this.takingAction = false;
          this.nextTurn();
        });
        break;
      case ('three'):
        this.addCoins(3).then(()=>{
          this.takingAction = false;
          this.nextTurn();
        });
        break;
      case ('steal'):
        this.addCoins(3).then(()=>{
          this.takingAction = false;
          this.nextTurn();
        });
        break;
      case ('assasinate'):
        this.addCoins(3).then(()=>{
          this.takingAction = false;
          this.nextTurn();
        });
        break;
      case ('coup'):
        this.addCoins(3).then(()=>{
          this.takingAction = false;
          this.nextTurn();
        });
        break;
      default:
        this.takingAction = false;
        break;
    }
    console.log(action,'action')
  }
  nextTurn(){
    console.log(this.turn);

    var nextPlayer = this.players[this.turn+1];
    if(nextPlayer){
      this.gameService.setTurn(this.gameId, this.turn+1);
    } else {
      this.gameService.setTurn(this.gameId, 0);
    }
  }
  addCoins(count){
    return this.gameService.addCoins(this.gameId, this.userPlayerObj.myTurn, this.userPlayerObj.coins + count);
  }


}

class PlayerObject {

  name;
  card1 = {
    name: "",
    isDead: false,
    assigned: false
  };
  card2 = {
    name: "",
    isDead: false,
    assigned: false
  };
  myTurn = false;
  coins = 2;
  constructor(name){
    this.name = name;
  }
  setCards(card1, card2){
    this.card1.name = card1;
    this.card1.assigned = true;
    this.card2.name = card2;
    this.card2.assigned = true;
  }

}