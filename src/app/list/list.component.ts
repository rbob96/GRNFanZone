import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FirebaseListObservable} from 'angularfire2';
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
  constructor(private router: Router,
              private route: ActivatedRoute,
              private clubDataService: ClubDataService,
              private teamDataService: TeamDataService,
              private playerDataService: PlayerDataService) {
    this.clubs = this.clubDataService.getClubs();
    this.teams = this.teamDataService.getTeams();
    this.players = this.playerDataService.getPlayersList();
  }


  public sendToPlayer (uid: string) {
    this.router.navigate(['/player/' + uid]);
  }

  public sendToTeam (uid: string) {
    this.router.navigate(['/team/' + uid]);
  }

  public sendToClub (uid: string) {
    this.router.navigate(['/club/' + uid]);
  }

}
