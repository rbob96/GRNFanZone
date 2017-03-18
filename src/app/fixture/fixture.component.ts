import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {SendtoService} from '../services/sendto.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  fixtureId: string;
  fixtureData: any;
  homeTeam: any;
  awayTeam: any;

  sendToTeam = this.sendto.team;

  constructor(private af: AngularFire,
              private router: Router,
              private route: ActivatedRoute,
              private sendto: SendtoService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fixtureId = params['id'];
    });

    this.af.database.object('fixtures/' + this.fixtureId).subscribe(fixture => {
      this.fixtureData = fixture;

      this.af.database.object('teams/' + this.fixtureData.home_team_id).subscribe(team => {
        this.homeTeam = team;
      });

      this.af.database.object('teams/' + this.fixtureData.away_team_id).subscribe(team => {
        this.awayTeam = team;
      });

    });

  }

  getTime() {
    return new Date().getTime();
  }

}
