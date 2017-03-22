import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {TranslateService} from 'ng2-translate';
import {MomentModule} from 'angular2-moment';
import * as moment from "moment";
import 'moment/min/locales';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-component.html',
  styleUrls: ['../navbar/navbar-component.css']
})

export class NavbarComponent {
  currentUser;
  constructor(public authService: AuthService,
              public translate: TranslateService) {
    this.currentUser = authService.userDetails;
    translate.setDefaultLang('en');
    moment.locale('en');
  }

  setLocale(locale) {
    this.translate.setDefaultLang(locale);
    moment.locale(locale);
  }
}
