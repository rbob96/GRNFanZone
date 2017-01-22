import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../profile/profile.component.css']
})



export class ProfileComponent {
  displayName;
  photoURL;
  email;
  constructor() {
    let displayName = '';
    let photoURL = '';
    let email = '';

  }

}
