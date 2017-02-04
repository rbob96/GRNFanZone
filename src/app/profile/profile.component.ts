import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../profile/profile.component.css']
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

  constructor( private router: Router, private route: ActivatedRoute, private userDataService: UserDataService ) {}

  ngOnInit() {
    // Activated Route unsubscribed from by router, so not necessary to
    // implement ngOnDestroy()
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      // Get user data
      this.profileData = this.userDataService.getUserData(this.userId);
      this.followingTeams = this.userDataService.getUserFollowingTeams(this.userId);
      this.followingPlayers = this.userDataService.getUserFollowingPlayers(this.userId);



    });
  }

  public sendToPlayer (uid: string) {
    console.log(uid);
    this.router.navigate(['/players/' + uid]);
  }

  public sendToTeam (uid: string) {
    console.log(uid);
    this.router.navigate(['/teams/' + uid]);

  }

}
