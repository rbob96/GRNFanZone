import { NgModule } from '@angular/core';
import { TranslateModule } from 'ng2-translate';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {TeamsFollowedComponent} from './teams-followed/teams-followed.component';
import {PlayersFollowedComponent} from './players-followed/players-followed.component';
import {TeamComponent} from './team-profile/team.component';
import {PlayerComponent} from './player-profile/player.component';
import {ClubComponent} from './club-profile/club.component';
import {TabViewModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';


import { routing } from './app.routing';
import { AuthService } from './services/auth.service';
import { DashboardDataService } from './services/dashboard-data.service';

export const firebaseConfig = {
    apiKey: 'AIzaSyCoo25Hw0ftCZHYtQx73gOvbu7SS4YCXW8',
    authDomain: 'grnfanzone.firebaseapp.com',
    databaseURL: 'https://grnfanzone.firebaseio.com',
    storageBucket: 'grnfanzone.appspot.com',
    messagingSenderId: '90265713781'
  };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    TeamsFollowedComponent,
    PlayersFollowedComponent,
    TeamComponent,
    PlayerComponent,
    ClubComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    TabViewModule,
    DataListModule,
    DialogModule
  ],
  providers: [
    AuthService,
    DashboardDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
