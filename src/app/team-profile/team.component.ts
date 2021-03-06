import 'rxjs/add/operator/map';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';


@Component({
  selector: 'app-team',
  templateUrl: 'team.component.html',
  styleUrls: ['team.component.css']
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

  upcomingFixtures = [];
  recentFixtures = [];

  public sendToPlayer = this.sendto.player;
  public sendToClub = this.sendto.club;
  public sendToFixture = this.sendto.fixture;

  constructor(private af: AngularFire,
              private router: Router,
              private route: ActivatedRoute,
              private userDataService: UserDataService,
              private sendto: SendtoService) {
    // get current user id
    this.af.auth.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
      } else {
        this.currentUserId = null;
      }
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.teamId = params['id'];
      // get current team data
      this.teamData = this.af.database.object('teams/' + this.teamId);

      // check if current team is followed by the current user
      this.af.database.list('users/' + this.currentUserId + '/teams_followed').subscribe(teams => {
        teams.forEach(team => {
          if (team.$key === this.teamId) {
            this.userFollowing = true;
          }
        });
      });
      // get club the team is associated with
      this.af.database.list('teams').subscribe(teams => {
        teams.forEach(team => {
          if (team.id === this.teamId) {
            this.clubId = team.club_id;
            this.clubData = this.af.database.object('clubs/' + this.clubId);
          }
        });
      });
      // get list of players belonging to the team
      this.af.database.list('players').subscribe(players => {
        players.forEach(player => {
          if (this.teamId in player.teams) {
            this.teamPlayers.push(player);
          }
        });
      });
      // check if players are followed by the current user
      this.af.database.list('users/' + this.currentUserId + '/players_followed').subscribe(players => {
        this.follows = players.map(p => {
          return p.$key;
        });
      });

      // get the posts of the team
      this.af.database.list('posts').subscribe(posts => {
        this.teamPosts = posts.filter(p => {
          return p.posted_by === this.teamId;
        });
      });
      // get fixtures involving the current team
      this.af.database.list('fixtures').subscribe(fixtures => {
        // 604800000 == 1 week in milliseconds (1000*60*60*24*7)
        const d = new Date;

        this.upcomingFixtures = fixtures.filter(f => {
          return (f.kickoff < d.getTime() + 604800000) && (f.kickoff > d.getTime());
        });

        this.recentFixtures = fixtures.filter(f => {
          return (f.kickoff > d.getTime() - 604800000) && (f.kickoff < d.getTime());
        });

      });

    });
  }
 // follow/unfollow team/players
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


}
