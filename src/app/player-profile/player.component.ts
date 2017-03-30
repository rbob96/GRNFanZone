import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';

@Component({
  selector: 'app-teams',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})

export class PlayerComponent implements OnInit {

  private sub: any;

  playerId: string;

  playerData: any;
  playerTeams: any;

  playerPosts = [];

  currentUserId: string;

  userFollowing = false;
  followTeams = [];
  followClubs = [];

  public sendToTeam = this.sendto.team;
  public sendToClub = this.sendto.club;

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
    // Activated Route unsubscribed from by router, so not necessary to
    // implement ngOnDestroy()
    this.sub = this.route.params.subscribe(params => {
      this.playerId = params['id'];

      // Get player data
      this.playerData = this.af.database.object('players/' + this.playerId);
      // check if current user is following current player
      this.af.database.list('users/' + this.currentUserId + '/players_followed').subscribe(players => {
        players.forEach(player => {
          if (player.$key === this.playerId) {
            this.userFollowing = true;
          }
        });
      });
      // get teams the player is associated with
      this.af.database.list('players/' + this.playerId + '/teams').subscribe(
        teams => {
          this.playerTeams = teams;
        }
      );
      // get teams the current user is following
      this.af.database.list('users/' + this.currentUserId + '/teams_followed').subscribe(teams => {
        this.followTeams = teams.map(t => {
          return t.$key;
        });
      });
      // get clubs the current user is following
      this.af.database.list('users/' + this.currentUserId + '/clubs_followed').subscribe(clubs => {
        this.followClubs = clubs.map(c => {
          return c.$key;
        });
      });

      // get posts made by the current player
      this.af.database.list('posts').subscribe( posts => {

        this.playerPosts = posts.filter( p => {
          return p.posted_by === this.playerId;
        });

      });

    });

  }
 // follow/unfollow club , team or player
  public unfollowPlayer() {
    this.userDataService.unfollowPlayer(this.currentUserId, this.playerId);
    this.userFollowing = false;
  }

  public followPlayer() {
    this.userDataService.followPlayer(this.currentUserId, this.playerId);
    this.userFollowing = true;
  }

// get a certain team by team id
  public getTeam (uid: string) {
    const item = this.af.database.object('teams/' + uid);
    let theTeam = 0;
    item.subscribe(team => {
      theTeam = team;
    });
    return theTeam;
  }

// get a club by team.club_id
  public getClub (uid: string) {
    const item = this.af.database.object('teams/' + uid);
    let clubId = 0;
    item.subscribe(team => {
      clubId = team.club_id;
    });

    const club = this.af.database.object('clubs/' + clubId);
    let theClub = 0;
    club.subscribe( c => {
      theClub = c;
    });
    return theClub;
}

public unfollowClub(uid: string) {
  this.userDataService.unfollowClub(this.currentUserId, uid);
}

public followClub(uid: string) {
  this.userDataService.followClub(this.currentUserId, uid);
  this.followClubs.push(uid);
}

public unfollowTeam(uid: string) {
  this.userDataService.unfollowTeam(this.currentUserId, uid);
}

public followTeam(uid: string) {
  this.userDataService.followTeam(this.currentUserId, uid);
  this.followTeams.push(uid);
}


}
