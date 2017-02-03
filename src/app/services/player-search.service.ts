import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { Player } from '../player';



@Injectable()
export class PlayerSearchService {

  constructor(private _af: AngularFire) { }

  getAllPlayers(): Observable<Player[]> {
    return this._af.database.list('/players');
  }


}
