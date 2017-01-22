import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import {Player} from '../player';
import {DataListModule} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Dialog} from 'primeng/primeng';
import {PlayersService} from '../services/players.service';


@Component({
  selector: 'app-players',
  templateUrl: './players-followed.html',
  styleUrls: ['../players-followed/players-followed.css'],
  providers: [PlayersService]
})

export class PlayersFollowedComponent implements OnInit {

  players: Player[];

  selectedPlayer: Player;

  displayDialog: boolean;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
      this.playersService.getPlayers().then(players => this.players = players);
      console.log('The component is initialized');
  }
}
