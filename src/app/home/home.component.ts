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

  checkRun = false;

  newUser = null;

  constructor(private af: AngularFire,
              private router: Router) {


    // Subscribe to the user
    this.af.auth.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });

    // Check the user's following choices to see if they have any. If they don't, then we show the
    // results component.

    if (this.uid) {
      if (this.uid && !this.checkRun) {
        // Only get the first result! Otherwise we get insta-directed to the dash after one follow
        this.af.database.object('users/' + this.uid, {preserveSnapshot: true}).take(1).subscribe(snap => {
          if (!isNullOrUndefined(snap.val().clubs_followed) ||
            !isNullOrUndefined(snap.val().teams_followed) ||
            !isNullOrUndefined(snap.val().players_followed)) {
            this.newUser = false;
          } else {
            this.newUser = true;
          }
        });
      }
    }

  }

}
