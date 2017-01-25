import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()

export class PlayerDataService {

  constructor(private af: AngularFire) {}

  // Gets all teams
  public getPlayers () {
    return this.af.database.list('/players');
  }

  // Gets a team by UID
  public getPlayerData (uid: string) {
    return this.af.database.object('/teams/' + uid);
  }

  // Sets a team by UID
  public setUserData (uid: string, playerObject: any) {
    // sanity checks
    if (
        playerObject.age &&
        playerObject.avatar &&
        playerObject.banner &&
        playerObject.bio &&
        playerObject.created_at &&
        playerObject.first_name &&
        playerObject.gender &&
        playerObject.height &&
        playerObject.id &&
        playerObject.last_name &&
        playerObject.location &&
        playerObject.location.city &&
        playerObject.location.country &&
        playerObject.teams &&
        playerObject.weight
    ) {

      // Get db observable
      const teamObservable = this.af.database.object('/teams/' + uid);

      // Update (destructive)
      teamObservable.set(playerObject);
    }
  }


}
