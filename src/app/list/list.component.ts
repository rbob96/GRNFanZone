/* tslint:disable:max-line-length */
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ClubDataService} from '../services/club-data.service';
import {TeamDataService} from '../services/team-data.service';
import {PlayerDataService} from '../services/player-data.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',

})

export class ListComponent {

  private sub: any;
  clubs: FirebaseListObservable<any>;
  teams: FirebaseListObservable<any>;
  players: FirebaseListObservable<any>;
  constructor(private router: Router, private route: ActivatedRoute, private clubDataService: ClubDataService, private teamDataService: TeamDataService, private playerDataService: PlayerDataService) {
    this.clubs = this.clubDataService.getClubs();
    this.teams = this.teamDataService.getTeams();
    this.players = this.playerDataService.getPlayers();
  }


  public sendToPlayer (uid: string) {
    this.router.navigate(['/players/' + uid]);
  }

  public sendToTeam (uid: string) {
    this.router.navigate(['/teams/' + uid]);
  }

  public sendToClub (uid: string) {
    this.router.navigate(['/clubs/' + uid]);
  }

}