import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {UserDataService} from '../services/user-data.service';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  // Subscription to route params
  private sub: any;

  // User id
  userId;

  // userObject
  profileData: FirebaseObjectObservable<any>;
  followingTeams: FirebaseListObservable<any>;
  followingPlayers: FirebaseListObservable<any>;
  followingClubs: FirebaseListObservable<any>;
  noTeams: number;
  noPlayers: number;
  noClubs: number;

  currentUser: string; // ID

  constructor( private router: Router,
               private route: ActivatedRoute,
               private userDataService: UserDataService,
               private af: AngularFire) {

    this.af.auth.subscribe(user => {
      this.currentUser = user.uid;
    });

  }

  ngOnInit() {

    // Activated Route unsubscribed from by router, so not necessary to
    // implement ngOnDestroy()
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      // Get user data
      this.profileData = this.userDataService.getUserData(this.userId);
      this.followingTeams = this.userDataService.getUserFollowingTeams(this.userId);
      this.followingPlayers = this.userDataService.getUserFollowingPlayers(this.userId);
      this.followingClubs = this.userDataService.getUserFollowingClubs(this.userId);

      this.noTeams = 0;
      this.noPlayers = 0;
      this.noClubs = 0;

      this.followingTeams.forEach(team => {
        this.noTeams = this.noTeams + 1;
      });

      this.followingPlayers.forEach(player => {
        this.noPlayers = this.noPlayers + 1;
      });

      this.followingClubs.forEach(club => {
        this.noClubs = this.noClubs + 1;
      });

    });
  }

  public sendToPlayer (uid: string) {
    this.router.navigate(['/player/' + uid]);
  }

  public sendToTeam (uid: string) {
    this.router.navigate(['/team/' + uid]);
  }

  public sendToClub (uid: string) {
    this.router.navigate(['/club/' + uid]);
  }

  public unfollowPlayer(uid: string) {
    this.userDataService.unfollowPlayer(this.currentUser, uid);
  }

  public unfollowTeam(uid: string) {
    this.userDataService.unfollowTeam(this.currentUser, uid);
  }

  public unfollowClub(uid: string) {
    this.userDataService.unfollowClub(this.currentUser, uid);
  }

}
