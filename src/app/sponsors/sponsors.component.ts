import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})

export class SponsorsComponent {
    constructor(public af: AuthService) {}
}
