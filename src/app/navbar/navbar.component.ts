import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-component.html',
  styleUrls: ['../navbar/navbar-component.css']
})

export class NavbarComponent {
  currentUser;
  constructor(private authService: AuthService) {
    this.currentUser = authService.userDetails;
  }
}
