import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {PlayerDataService} from '../services/player-data.service';

import {Player} from '../player';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {


  // Get filtered results
  results: FirebaseListObservable<any>;
  players = [];
  
  
  // Player uid
  playerName: string;


  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private playerDataService: PlayerDataService) { 
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playerName = params['query'];
      this.results = this.playerDataService.getPlayersList(this.playerName);
    });

    

    this.results.subscribe(results => {
      results.forEach(result => {
        if(result.first_name.toLowerCase() == this.playerName.toLowerCase()){
          this.players.push(result);
        }
      });
    });


  }
}
