import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()

// We will only be pulling data, not updating it
export class TeamDataService {

  constructor(private af: AngularFire) {}

  // Gets all teams
  public getTeams () {
    return this.af.database.list('/teams');
  }

  // Gets a team by UID
  public getTeamData (uid: string) {
    return this.af.database.object('/teams/' + uid);
  }




}
