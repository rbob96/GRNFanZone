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

  playerData: any;
  playerTeams: any;

  playerPosts = [];

  currentUserId: string;

  userFollowing = false;
  followTeams = [];
  followClubs = [];


  constructor(private af: AngularFire,
              private router: Router,
              private route: ActivatedRoute,
              private userDataService: UserDataService) {

    this.af.auth.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.af.database.list('users/' + user.uid + '/players_followed').subscribe(players => {

          players.forEach(player => {
            if (player.$key === this.playerId) {
              this.userFollowing = true;
            }
          });

        });
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

      this.af.database.list('players/' + this.playerId + '/teams').subscribe(
        teams => {
          this.playerTeams = teams;
        }
      );

      this.af.database.list('users/' + this.currentUserId + '/teams_followed').subscribe(teams => {
        this.followTeams = teams.map(t => {
          return t.$key;
        });
      });

      this.af.database.list('users/' + this.currentUserId + '/clubs_followed').subscribe(clubs => {
        this.followClubs = clubs.map(c => {
          return c.$key;
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

  public sendToTeam (uid: string) {
    this.router.navigate(['/team/' + uid]);
  }

  public sendToClub (uid: string) {
    this.router.navigate(['/club/' + uid]);
  }

  public getTeam (uid: string) {
  const item = this.af.database.object('teams/' + uid);
  let theTeam = 0;
  item.subscribe(team => {
    theTeam = team;
  });
  return theTeam;
  }

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
