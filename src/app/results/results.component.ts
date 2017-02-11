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
  players = [];
  sub: any;


  // Player uid
  playerName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private af: AngularFire) {}


  ngOnInit() {

      this.sub = this.route.params.subscribe(params => {
        const staticPlayerName = params['query'];
        this.playerName = staticPlayerName;
      });
      console.log(this.playerName);
      const results = this.af.database.list('/players', {
        query: {
          orderByChild: 'first_name',
          equalTo: this.playerName
        }
      }).subscribe(serverResults => {
          serverResults.forEach(result => {
            this.players.push(result);
          });
        });
  }
}
