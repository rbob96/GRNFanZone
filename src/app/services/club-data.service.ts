import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()

// We will only be pulling data, not updating it
export class ClubDataService {

  constructor(private af: AngularFire) {}

  // Gets all clubs
  public getClubs () {
    return this.af.database.list('/clubs');
  }

  // Gets a club by UID
  public getClubData (uid: string) {
    return this.af.database.object('/clubs/' + uid);
  }

}
