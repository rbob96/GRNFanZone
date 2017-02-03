import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ClubDataService} from '../services/club-data.service';
import {TeamDataService} from '../services/team-data.service';
import {PlayerDataService} from '../services/player-data.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',

})

export class ListComponent {
  clubs: FirebaseListObservable<any>;
  teams: FirebaseListObservable<any>;
  players: FirebaseListObservable<any>;
  constructor(private clubDataService: ClubDataService, private teamDataService: TeamDataService, private playerDataService: PlayerDataService) {
    this.clubs = this.clubDataService.getClubs();
    this.teams = this.teamDataService.getTeams();
    this.players = this.playerDataService.getPlayers();
  }

}
