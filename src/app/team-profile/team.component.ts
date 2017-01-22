import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-team',
  templateUrl: './team-component.html',

})

export class TeamComponent {
  constructor(private af: AuthService) {}

}
