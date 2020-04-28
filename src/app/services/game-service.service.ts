import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(
    private db: AngularFireDatabase,
    ) { }

  //game
  getGame(id){
    return this.db.object('/games/'+id).valueChanges();
  }
  newGame(gameId, firstUser){
    var gameStart = new Date();
    var obj = {
      players: [firstUser],
      gameId: gameId,
      gameStarted: gameStart
    }
    return this.db.object('/games/'+gameId).set(obj)

  }
  setTurn(game, turn){
    return this.db.object('/games/'+game+"/turn").set(turn);
  }


  //players
  getPlayers(gameId){
    return this.db.list('/games/'+gameId+"/players").snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data:any = a.payload.val();
        const key = a.payload.key;
        return {
          key: key,
          name: data.name,
        }
      });
    }));
  }
  updatePlayers(gameId, players){
    var obj = true;
    this.db.object('/games/'+gameId+"/started").set(obj)
    this.db.object('/games/'+gameId+"/turn").set(0);
    return this.db.object('/games/'+gameId+"/players").set(players)
  }


  //player
  addPlayer(gameId, player){
    var obj = {name: player}
    return this.db.list('/games/'+gameId+"/players").push(obj)
  }
  addCoins(gameId, player, coins){
    return this.db.object('/games/'+gameId+"/players/"+player+"/coins").set(coins)
  }
  removePlayer(gameId, playerKey){
    return this.db.list('/games/'+gameId+"/players/"+playerKey).remove();
  }

}
