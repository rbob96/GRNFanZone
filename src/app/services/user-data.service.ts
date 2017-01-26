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
    if (userObject) {
      // Get db observable
      const userObservable = this.af.database.object('/users/' + uid);
      // Update (destructive)
      userObservable.set({
        avatar: userObject.avatar,
        email: userObject.email,
        name: userObject.name,
        players_followed: userObject.players_followed,
        teams_followed: userObject.teams_followed,
        clubs_followed: userObject.clubs_followed
      });

    }

  }

  public getUserFollowingPlayers (uid: string) {
    return this.af.database.list('/users/' + uid + '/players_followed');
  }

  public followPlayer (userID: string, playerID: string) {

    // Creates a promise for the player object, and then pushes the required data to the user's players list
    this.af.database.object('/players/' + playerID).first().toPromise().then(player => {

      // Defines a new child in the list
      const followed = this.af.database.object('/users/' + userID + '/players_followed/' + playerID);
      followed.set({
        first_name: player.first_name,
        last_name: player.last_name,
        id: player.id,
        avatar: player.avatar
      });

    });

  }

  public unfollowPlayer (userID: string, playerID: string) {
    const toDelete = this.af.database.object('/users/' + userID + '/players_followed/' + playerID);
    toDelete.remove();
  }

  public getUserFollowingTeams (uid: string) {
    return this.af.database.list('/users/' + uid + '/teams_followed');
  }

  public followTeam (userID: string, teamID: string) {

    this.af.database.object('/teams/' + teamID).first().toPromise().then(team => {

      const followed = this.af.database.object('/users/' + userID + '/teams_followed/' + teamID);
      followed.set({
        name: team.name,
        id: team.id,
        avatar: team.avatar
      });

    });

  }

  public unfollowTeam (userID: string, teamID: string) {
    const toDelete = this.af.database.object('/users/' + userID + '/teams_followed/' + teamID);
    toDelete.remove();
  }

  public getUserFollowingClubs (uid: string) {
    return this.af.database.list('/users/' + uid + '/clubs_followed');
  }

  public followClub (userID: string, clubID: string) {

    this.af.database.object('/clubs/' + clubID).first().toPromise().then(club => {
      const followed = this.af.database.object('/users/' + userID + '/clubs_followed/' + clubID);
      followed.set({
        name: club.name,
        id: club.id,
        avatar: club.avatar
      });

    });

  }

  public unfollowClub (userID: string, clubID: string) {
    const toDelete = this.af.database.object('/users/' + userID + '/clubs_followed/' + clubID);
    toDelete.remove();
  }

}
