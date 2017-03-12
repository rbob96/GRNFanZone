import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {UserDataService} from '../services/user-data.service';
import {SendtoService} from '../services/sendto.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  // Get filtered results
  userData: FirebaseListObservable<any>;
  players = [];
  teams = [];
  clubs = [];
  users = [];
  fixtures = [];

  currentUserId: string;

  followTeams = [];
  followClubs = [];
  followPlayers = [];

  sub: any;
  // Player uid
  searchTerm: string;

  public sendToClub = this.sendto.club;
  public sendToTeam = this.sendto.team;
  public sendToPlayer = this.sendto.player;
  public sendToUser = this.sendto.user;
  public sendToFixture = this.sendto.fixture;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private userDataService: UserDataService,
              private sendto: SendtoService) {

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
      if ('query' in params) {
        this.searchTerm = params['query'];
      } else {
        this.searchTerm = '';
      }
      this.findPlayers();
      this.findUsers();
      this.findTeams();
      this.findClubs();
      this.findFixtures();
    });

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

    this.af.database.list('users/' + this.currentUserId + '/players_followed').subscribe(players => {
      this.followPlayers = players.map(p => {
        return p.$key;
      });
    });
  }

  findPlayers() {
    const results = this.af.database.list('/players').subscribe(serverResults => {
      this.players = [];
      serverResults.forEach(result => {
        if (((result.first_name + ' ' + result.last_name).toLowerCase()).includes(this.searchTerm.toLowerCase())) {
          this.players.push(result);
        }
      });
    });
  }

  findUsers() {
    const users = this.af.database.list('/users').subscribe(serverResults => {
      this.users = [];
      serverResults.forEach(result => {
        if ((result.name.toLowerCase()).includes(this.searchTerm.toLowerCase())) {
          this.users.push(result);
        }
      });
    });
  }

  findTeams() {
    const teams = this.af.database.list('/teams').subscribe(serverResults => {
      this.teams = [];
      serverResults.forEach(result => {
        if ((result.name.toLowerCase()).includes(this.searchTerm.toLowerCase())) {
          this.teams.push(result);
        }
      });
    });
  }

  findClubs() {
    const clubs = this.af.database.list('clubs').subscribe(serverResults => {
      this.clubs = [];
      serverResults.forEach(result => {
        if ((result.name.toLowerCase()).includes(this.searchTerm.toLowerCase())) {
          this.clubs.push(result);
        }
      });
    });
  }

  findFixtures() {
    const fixtures = this.af.database.list('fixtures').subscribe(serverResults => {
      this.fixtures = [];
      serverResults.forEach(result => {
        if ((result.home_team.toLowerCase()).includes(this.searchTerm.toLowerCase()) ||
          (result.away_team.toLowerCase()).includes(this.searchTerm.toLowerCase())) {
          this.fixtures.push(result);
        }
      })
    });
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

  public unfollowPlayer(uid: string) {
    this.userDataService.unfollowPlayer(this.currentUserId, uid);
  }

  public followPlayer(uid: string) {
    this.userDataService.followPlayer(this.currentUserId, uid);
    this.followPlayers.push(uid);
  }
}
