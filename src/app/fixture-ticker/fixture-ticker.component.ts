import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFire} from 'angularfire2';
import {SendtoService} from '../services/sendto.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fixture-ticker',
  templateUrl: './fixture-ticker.component.html',
  styleUrls: ['./fixture-ticker.component.css']
})
export class FixtureTickerComponent implements OnInit {

  fixtures = [];

  sendToFixture = this.sendto.fixture;

  constructor(private authService: AuthService,
              private af: AngularFire,
              private sendto: SendtoService,
              private router: Router) {

    const d = new Date();

    af.database.object('users/' + authService.userDetails.uid).subscribe( u => {

      af.database.list('/fixtures', {
        query: {
          orderByChild: 'kickoff',
          startAt: d.getTime()
        }
      }).subscribe(f => {
        this.fixtures = [];
        f.forEach(fix => {
          if ((fix.home_team_id in u.teams_followed ||
            fix.away_team_id in u.teams_followed) &&
            this.fixtures.length < 5 ){
            this.fixtures.push(fix);
          }
        });
      });

    });


  }

  ngOnInit() {
  }

}
