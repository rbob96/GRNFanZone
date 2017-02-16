import 'rxjs/add/operator/map';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {User} from '../user';


@Component({
  selector: 'app-team',
  templateUrl: './team-component.html',
  styleUrls: ['./team-component.css']
})

export class TeamComponent implements OnInit {

  private sub: any;

  teamId: string;
  teamData: any;
  teamPosts = [];
  teamPlayers = [];

  clubId: string;
  clubData: any;

  currentUserId: string;

  userFollowing = false;

  follows = [];

  constructor(private af: AngularFire,
              private router: Router,
              private route: ActivatedRoute,
              private userDataService: UserDataService) {

    this.af.auth.subscribe(user => {
      this.currentUserId = user.uid;
      this.af.database.list('users/' + user.uid + '/teams_followed').subscribe(teams => {

        teams.forEach(team => {
          if (team.$key === this.teamId) {
            this.userFollowing = true;
          }
        });
      });
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.teamId = params['id'];

      this.teamData = this.af.database.object('teams/' + this.teamId);

      this.af.database.list('teams').subscribe(teams => {
        teams.forEach(team => {
          if (team.id === this.teamId) {
            this.clubId = team.club_id;
            this.clubData = this.af.database.object('clubs/' + this.clubId);
          }
        });
      });

      this.af.database.list('players').subscribe(players => {
        players.forEach(player => {
          if (this.teamId in player.teams) {
            this.teamPlayers.push(player);
          }
        });
      });

      this.af.database.list('users/' + this.currentUserId + '/players_followed').subscribe(players => {
        this.follows = players.map(p => {
          return p.$key;
        });
      });

      this.af.database.list('posts').subscribe(posts => {
        this.teamPosts = posts.filter(p => {
          return p.posted_by === this.teamId;
        });
      });
    });
  }

  public unfollowTeam() {
    this.userDataService.unfollowTeam(this.currentUserId, this.teamId);
    this.userFollowing = false;
  }

  public followTeam() {
    this.userDataService.followTeam(this.currentUserId, this.teamId);
    this.userFollowing = true;
  }

  public unfollowPlayer(uid: string) {
    this.userDataService.unfollowPlayer(this.currentUserId, uid);
  }

  public followPlayer(uid: string) {
    this.userDataService.followPlayer(this.currentUserId, uid);
    this.follows.push(uid);
  }

  public sendToPlayer (uid: string) {
    this.router.navigate(['/player/' + uid]);
  }

  public sendToClub (uid: string) {
    this.router.navigate(['/club/' + uid]);
  }

}
