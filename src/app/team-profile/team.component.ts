import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-team',
  templateUrl: './team-component.html',

})

export class TeamComponent {
  constructor(private af: AuthService) {}

}
