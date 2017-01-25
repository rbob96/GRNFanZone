import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class UserDataService {

  constructor(private af: AngularFire) {}

  public getUserData (uid: string) {

    return this.af.database.object('/users/' + uid);

  }

  public setUserData (uid: string, userObject: any) {

    // sanity checks
    if (userObject.email && userObject.name && userObject.avatar) {
      // Get db observable
      const userObservable = this.af.database.object('/users/' + uid);
      // Update (destructive)
      userObservable.set({
        avatar: userObject.avatar,
        email: userObject.email,
        name: userObject.name
      });

    }

  }

  public getUserFollowingTeams (uid: string) {
    return this.af.database.list('/users/' + uid + '/teams_followed');
  }

  public getUserFollowingPlayers (uid: string) {
    return this.af.database.list('/users/' + uid + '/players_followed');
  }

  public followPlayer (userID: string, playerID: string) {

    // Creates a promise for the player object, and then pushes the required data to the user's players list
    this.af.database.object('/players/' + playerID).first().toPromise().then(player => {
      this.af.database.list('/users/' + userID + '/players_followed').push({
        first_name: player.first_name,
        last_name: player.last_name,
        id: player.id,
        avatar: player.avatar
      });
    });

  }

  public followTeam (userID: string, teamID: string) {

    this.af.database.object('/teams/' + teamID).first().toPromise().then(team => {
      this.af.database.list('/users/' + userID + '/teams_followed').push({
        name: team.name,
        id: team.id,
        avatar: team.avatar
      });
    });

  }

  public followClub (userID: string, clubID: string) {

    this.af.database.object('/clubs/' + clubID).first().toPromise().then(club => {
      this.af.database.list('/users/' + userID + '/clubs_followed').push({
        name: club.name,
        id: club.id,
        avatar: club.avatar
      });
    });

  }


}
