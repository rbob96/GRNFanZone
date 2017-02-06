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

  
  // Player Object
  player: Player;

  // Get filtered results
  results: Player[];
  allPlayers: FirebaseListObservable<Player[]>;;

  playerName: string;


  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private playerDataService: PlayerDataService) { 
    }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.playerName = params['query'];
    });
    
    this.playerDataService.searchPlayer(this.playerName)
      .subscribe(
        players => this.results = players
      )

    console.log(this.results);

    


    
    // // Get player
    // player.first_name = player.first_name.toLowerCase();
    // }
    // this.results = this.allPlayers.filter(player => player.first_name.includes(this.playerName.toLowerCase()));
  
    // }
  }
}
