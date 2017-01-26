import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()

// We will only be pulling data, not updating it
export class PlayerDataService {

  constructor(private af: AngularFire) {}

  // Gets all players
  public getPlayers () {
    return this.af.database.list('/players');
  }

  // Gets a player by UID
  public getPlayerData (uid: string) {
    return this.af.database.object('/players/' + uid);
  }

}
