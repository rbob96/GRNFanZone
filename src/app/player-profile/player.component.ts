import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {User} from '../user';

@Component({
  selector: 'app-teams',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})

export class PlayerComponent implements OnInit {

  private sub: any;

  playerId: string;
  clubId: string;
  teamId: string;

  playerData: any;
  playerPosts = [];

  clubData: any;

  teamData: any;

  currentUserId: string;

  userFollowing = false;

  constructor(private af: AngularFire,
              private router: Router,
              private route: ActivatedRoute,
              private userDataService: UserDataService) {

    this.af.auth.subscribe(user => {
      this.currentUserId = user.uid;
      this.af.database.list('users/' + user.uid + '/players_followed').subscribe(players => {

        players.forEach(player => {
          if (player.$key === this.playerId) {
            this.userFollowing = true;
          }
        });

      });
    });
  }

  ngOnInit() {
    // Activated Route unsubscribed from by router, so not necessary to
    // implement ngOnDestroy()
    this.sub = this.route.params.subscribe(params => {
      this.playerId = params['id'];

      // Get player data
      this.playerData = this.af.database.object('players/' + this.playerId);

      this.af.database.list('players').subscribe(players => {
        players.forEach(player => {
          if (player.id === this.playerId) {
            this.clubId = player.club_id;
            this.clubData = this.af.database.object('clubs/' + this.clubId);
          }
        });
      });

      this.af.database.list('players').subscribe(players => {
        players.forEach(player => {
          if (player.id === this.playerId) {
            this.teamId = player.team_id;
            this.teamData = this.af.database.object('teams/' + this.teamId);
          }
        });
      });

      // and posts
      this.af.database.list('posts').subscribe( posts => {

        this.playerPosts = posts.filter( p => {
          return p.posted_by === this.playerId;
        });

      });

    });

  }

  public unfollowPlayer() {
    this.userDataService.unfollowPlayer(this.currentUserId, this.playerId);
    this.userFollowing = false;
  }

  public followPlayer() {
    this.userDataService.followPlayer(this.currentUserId, this.playerId);
    this.userFollowing = true;
  }

}
