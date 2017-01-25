import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './player-component.html',
  styleUrls: ['../player-profile/player-component.css']
})

export class PlayerComponent {
  constructor(private af: AuthService) {}

}
