import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {AgmCoreModule} from 'angular2-google-maps/core';

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

  constructor(private af: AngularFire,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fixtureId = params['id'];
    });

    this.af.database.object('fixtures/' + this.fixtureId).subscribe(fixture => {
      this.fixtureData = fixture;

      this.af.database.object('teams/' + this.fixtureData.home_team_id).subscribe(team => {
        this.homeTeam = team;
        console.log(team);
      });

      this.af.database.object('teams/' + this.fixtureData.away_team_id).subscribe(team => {
        this.awayTeam = team;
        console.log(team);
      });

    });


  }

  getTime() {
    return new Date().getTime();
  }

  sendToTeam(uid: string) {
    this.router.navigate(['/team/' + uid]);
  }

}
