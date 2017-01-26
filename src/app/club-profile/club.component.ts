import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import {TabViewModule} from 'primeng/primeng';
@Component({
  selector: 'app-club',
  templateUrl: './club-component.html',
  styleUrls: ['../club-profile/club-component.css']
})

export class ClubComponent {
  constructor(private af: AuthService) {}

}
