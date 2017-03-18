import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';


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


  public sendToPlayer = this.sendto.player;
  public sendToTeam = this.sendto.team;
  public sendToClub = this.sendto.club;
  public sendToTeamsList = this.sendto.teamsList;
  public sendToPlayersList = this.sendto.playersList;
  public sendToClubsList = this.sendto.clubsList;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private userDataService: UserDataService,
               private af: AngularFire,
               private sendto: SendtoService) {

    this.af.auth.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
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

      this.followingTeams.subscribe(result => { this.noTeams = result.length; });
      this.followingPlayers.subscribe(result => { this.noPlayers = result.length; });
      this.followingClubs.subscribe(result => { this.noClubs = result.length; });
    });
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
