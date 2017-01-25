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
      teamObservable.set({
        age_group: teamObject.age_group,
        avatar: teamObject.avatar,
        banner: teamObject.banner,
        club_id: teamObject.club_id,
        created_at: teamObject.created_at,
        description: teamObject.description,
        gender: teamObject.gender,
        id: teamObject.id,
        location: {
            address: teamObject.location.address,
          city: teamObject.location.city,
          country: teamObject.location.country
        },
        name: teamObject.name,
        type: teamObject.location.type

      });
    }
  }


}
