import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playersFollowed',
  templateUrl: './players-followed.html',
  styleUrls: ['../players-followed/players-followed.css']
})

export class PlayersFollowedComponent {
  constructor(private af: AuthService) {}

}
