import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {User} from '../user';


@Component({
  selector: 'app-team',
  templateUrl: './team-component.html',

})

export class TeamComponent implements OnInit {

  private sub: any;

  teamId: string;

  teamData: any;
  teamPosts = [];
  teamPlayers = [];

  currentUserId: string;

  userFollowing = false;

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

      this.af.database.list('posts').subscribe(posts => {
        this.teamPosts = posts.filter(p => {
          return p.posted_by === this.teamId;
        });
      });

      this.af.database.list('players').subscribe(players => {
        players.forEach(player => {
          if (this.teamId in player.teams) {
            this.teamPlayers.push(player);
          }
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

  public sendToPlayer (uid: string) {
    this.router.navigate(['/player/' + uid]);
  }

}
