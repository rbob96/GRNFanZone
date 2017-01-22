import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../profile/profile.component.css'],
  providers: [ AuthService ]
})



export class ProfileComponent {

  constructor( ) {
    let displayName = '';
    let photoURL = '';
    let email = '';

    displayName = '';
    photoURL = '';
    email = '';

  }

}
