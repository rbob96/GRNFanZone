import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()

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

  // Sets a team by UID
  public setUserData (uid: string, teamObject: any) {
    // sanity checks
    if (
      teamObject.age_group &&
      teamObject.avatar &&
      teamObject.banner &&
      teamObject.club_id &&
      teamObject.created_at &&
      teamObject.description &&
      teamObject.gender &&
      teamObject.id &&
      teamObject.location &&
      teamObject.location.address &&
      teamObject.location.city &&
      teamObject.location.country &&
      teamObject.name &&
      teamObject.type
    ) {

      // Get db observable
      const teamObservable = this.af.database.object('/teams/' + uid);

      // Update (destructive)
      teamObservable.set(teamObject);
    }
  }


}
