import 'rxjs/add/operator/map';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';



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

  public sendToTeam = this.sendto.team;

  constructor(private af: AngularFire,
              private route: ActivatedRoute,
              private userDataService: UserDataService,
              private sendto: SendtoService,
              private router: Router) {

// get id of current user
    this.af.auth.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
      } else {
        this.currentUserId = null;
      }
    });
  }

  ngOnInit() {

    // check if the current user is following the current club
    this.sub = this.route.params.subscribe(params => {
      this.clubId = params['id'];

      this.clubData = this.af.database.object('clubs/' + this.clubId);

      this.af.database.list('users/' + this.currentUserId + '/clubs_followed').subscribe(clubs => {
        clubs.forEach(club => {
          if (club.$key === this.clubId) {
            this.userFollowing = true;
          }
        });
      });

// get list of teams associated to the current club
      this.af.database.list('teams').subscribe(teams => {
        teams.forEach(team => {
          if (this.clubId === team.club_id) {
            this.clubTeams.push(team);
          }
        });
      });
// get list of teams followed by the current user to display follow/unfollow
      this.af.database.list('users/' + this.currentUserId + '/teams_followed').subscribe(teams => {
        this.follows = teams.map(t => {
          return t.$key;
        });
      });

// get list of posts made by the current club
      this.af.database.list('posts').subscribe(posts => {
        this.clubPosts = posts.filter(p => {
          return p.posted_by === this.clubId;
        });
      });
    });
  }

// methods to follow/unfollow teams and clubs
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
}
