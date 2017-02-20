import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
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
  sub: any;
  // Player uid
  searchTerm: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private af: AngularFire) {}
  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.searchTerm = params['query'];
        this.findPlayers();
        this.findUsers();
        this.findTeams();
        this.findClubs();
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
}
