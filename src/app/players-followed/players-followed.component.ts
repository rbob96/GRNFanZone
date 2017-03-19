import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';


@Component({
  selector: 'app-players',
  templateUrl: './players-followed.html',
  styleUrls: ['./players-followed.css']
})

export class PlayersFollowedComponent implements OnInit {
  // Subscription to route params
  private sub: any;

  // User id
  userId;

  // userObject
  profileData: FirebaseObjectObservable<any>;
  followingPlayers: FirebaseListObservable<any>;

  currentUser: string; // ID

  public sendToPlayer = this.sendto.player;

  constructor( private router: Router,
               private route: ActivatedRoute,
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
      this.followingPlayers = this.userDataService.getUserFollowingPlayers(this.userId);
    });
  }

  public unfollowPlayer(uid: string) {
    this.userDataService.unfollowPlayer(this.currentUser, uid);
  }

}
