import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { Player } from '../player';

@Injectable()

// We will only be pulling data, not updating it
export class PlayerDataService {

  constructor(private af: AngularFire) {}

  // Gets all players
  public getPlayers(): Observable<Player[]> {
    return this.af.database.list('/players/');
  }

  // Get player list
  public getPlayersList(uid: string) {
    return this.af.database.list('/players/');
  }
}
