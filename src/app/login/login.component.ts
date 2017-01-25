import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styleUrls: ['../login/login-component.css']
})

export class LoginComponent {

    constructor(private af: AuthService) {}

}
