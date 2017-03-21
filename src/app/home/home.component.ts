import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  uid: string;
  user: any;

  newUser = null;

  constructor(private af: AngularFire,
              private router: Router) {


    // Subscribe to the user
    this.af.auth.subscribe(user => {
      this.uid = user.uid;
    });

    // Check the user's following choices to see if they have any. If they don't, then we show the
    // results component.


    if (this.uid) {
      this.af.database.object('users/' + this.uid).subscribe( user => {

        if (!isNullOrUndefined(user.clubs_followed) ||
          !isNullOrUndefined(user.clubs_followed) ||
          !isNullOrUndefined(user.players_followed)) {
          this.newUser = false;
        } else {
          this.newUser = true;
        }

      });
    }

  }

}
