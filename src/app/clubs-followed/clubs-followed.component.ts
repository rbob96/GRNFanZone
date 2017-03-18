import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs-followed.html',
  styleUrls: ['./clubs-followed.css']
})

export class ClubsFollowedComponent implements OnInit {
  // Subscription to route params
  private sub: any;

  // User id
  userId;

  // userObject
  profileData: FirebaseObjectObservable<any>;
  followingClubs: FirebaseListObservable<any>;

  currentUser: string; // ID

  public sendToClub = this.sendto.club;

  constructor( private route: ActivatedRoute,
               private userDataService: UserDataService,
               private af: AngularFire,
               private sendto: SendtoService) {

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
      this.followingClubs = this.userDataService.getUserFollowingClubs(this.userId);
    });
  }

  public unfollowClub(uid: string) {
    this.userDataService.unfollowClub(this.currentUser, uid);
  }

}
