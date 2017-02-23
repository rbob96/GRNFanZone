import 'rxjs/add/operator/map';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {User} from '../user';
import {TranslateService} from 'ng2-translate';



@Component({
  selector: 'app-club',
  templateUrl: 'club.component.html',
  styleUrls: ['club.component.css']
})

export class ClubComponent implements OnInit {

  private sub: any;

  clubId: string;
  clubData: any;
  clubPosts = [];
  clubTeams = [];

  currentUserId: string;

  userFollowing = false;

  follows = [];

  constructor(private af: AngularFire,
              private router: Router,
              private route: ActivatedRoute,
              private userDataService: UserDataService) {

    this.af.auth.subscribe(user => {
      this.currentUserId = user.uid;
      this.af.database.list('users/' + user.uid + '/clubs_followed').subscribe(clubs => {
        clubs.forEach(club => {
          if (club.$key === this.clubId) {
            this.userFollowing = true;
          }
        });
      });
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.clubId = params['id'];

      this.clubData = this.af.database.object('clubs/' + this.clubId);

      this.af.database.list('teams').subscribe(teams => {
        teams.forEach(team => {
          if (this.clubId === team.club_id) {
            this.clubTeams.push(team);
          }
        });
      });

      this.af.database.list('users/' + this.currentUserId + '/teams_followed').subscribe(teams => {
        this.follows = teams.map(t => {
          return t.$key;
        });
      });

      this.af.database.list('posts').subscribe(posts => {
        this.clubPosts = posts.filter(p => {
          return p.posted_by === this.clubId;
        });
      });
    });
  }

  public unfollowClub() {
    this.userDataService.unfollowClub(this.currentUserId, this.clubId);
    this.userFollowing = false;
  }

  public followClub() {
    this.userDataService.followClub(this.currentUserId, this.clubId);
    this.userFollowing = true;
  }

  public unfollowTeam(uid: string) {
    this.userDataService.unfollowTeam(this.currentUserId, uid);
  }

  public followTeam(uid: string) {
    this.userDataService.followTeam(this.currentUserId, uid);
    this.follows.push(uid);
  }

  public sendToTeam (uid: string) {
    this.router.navigate(['/team/' + uid]);
  }

}
