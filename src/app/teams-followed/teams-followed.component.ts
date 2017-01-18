import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teamsFollowed',
  templateUrl: './teams-followed.html',
  styleUrls: ['../teams-followed/teams-followed.css']
})

export class TeamsFollowedComponent {
  constructor(private af: AuthService) {}

}
