import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';


import { Player } from '../player';



@Injectable()

// We will only be pulling data, not updating it
export class PlayerDataService {

  player: Player[];

  filtered: FirebaseListObservable<Player[]>;
  allPlayers: FirebaseListObservable<Player[]>;

  constructor(private af: AngularFire) {}

  // Gets all players
  public getPlayers(): Observable<Player[]> {
    return this.af.database.list('/players');
  }

  // Gets a player by UID
  public getPlayerData (uid: string) {
    return this.af.database.object('/players/' + uid);
  }

  public searchPlayer(uid: string){
    this.allPlayers = this.af.database.list('/players/' + uid);
    return this.allPlayers; 
  }
}
