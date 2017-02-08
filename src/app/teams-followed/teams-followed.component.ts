import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams-followed.html',
  styleUrls: ['../teams-followed/teams-followed.css']
})

export class TeamsFollowedComponent {
  constructor(private af: AuthService) {}

}
