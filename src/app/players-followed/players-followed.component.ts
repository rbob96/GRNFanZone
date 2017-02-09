import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Player} from '../player';
import {PlayerDataService} from '../services/player-data.service';


@Component({
  selector: 'app-players',
  templateUrl: './players-followed.html',
  styleUrls: ['./players-followed.css'],
  providers: [ PlayerDataService ]
})

export class PlayersFollowedComponent implements OnInit {

  players: Player[];

  selectedPlayer: Player;

  displayDialog: boolean;

  constructor(private playerDataService: PlayerDataService, private router: Router) { }

  ngOnInit() {
      const promise = this.playerDataService.getPlayers();
      promise.subscribe(players => this.players = [1, 2]);
  }

  public selectPlayer (playerId: string) {
    // this.router.navigate(['/player/' + playerId]);
  }

}
