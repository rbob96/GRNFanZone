import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams-followed.html',
  styleUrls: ['../teams-followed/teams-followed.css']
})

export class TeamsFollowedComponent implements OnInit {
  // Subscription to route params
  private sub: any;

  // User id
  userId;

  // userObject
  profileData: FirebaseObjectObservable<any>;
  followingTeams: FirebaseListObservable<any>;

  currentUser: string; // ID

  public sendToTeam = this.sendto.team;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private userDataService: UserDataService,
               private af: AngularFire,
               private sendto: SendtoService) {

    // get current user id
    this.af.auth.subscribe(user => {
      if (user) {
        this.currentUser = user.uid;
      } else {
        this.currentUser = null;
      }
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
    });
  }

  public unfollowTeam(uid: string) {
    this.userDataService.unfollowTeam(this.currentUser, uid);
  }

}
