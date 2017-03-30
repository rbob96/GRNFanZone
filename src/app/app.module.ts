import { NgModule } from '@angular/core';
import { TranslateModule } from 'ng2-translate';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';
import {MomentModule} from 'angular2-moment';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { TeamsFollowedComponent } from './teams-followed/teams-followed.component';
import { PlayersFollowedComponent } from './players-followed/players-followed.component';
import {ClubsFollowedComponent} from './clubs-followed/clubs-followed.component';
import { TeamComponent } from './team-profile/team.component';
import { PlayerComponent } from './player-profile/player.component';
import { ClubComponent } from './club-profile/club.component';
import { TabViewModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import {UserDataService} from './services/user-data.service';
import {SponsorsComponent} from './sponsors/sponsors.component';

import { routing } from './app.routing';
import { AuthService } from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';

import {PostDataService} from './services/post-data.service';
import { PostComponent } from './post/post.component';
import { FixtureComponent } from './fixture/fixture.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {SendtoService} from './services/sendto.service';
import {UnauthGuardService} from './services/unauth-guard.service';
import { HomeComponent } from './home/home.component';
import { NearbyFixturesComponent } from './nearby-fixtures/nearby-fixtures.component';
import {GeolocationService} from './services/geolocation.service';


export const firebaseConfig = {
  apiKey: 'AIzaSyCoo25Hw0ftCZHYtQx73gOvbu7SS4YCXW8',
  authDomain: 'grnfanzone.firebaseapp.com',
  databaseURL: 'https://grnfanzone.firebaseio.com',
  storageBucket: 'grnfanzone.appspot.com',
  messagingSenderId: '90265713781'
};

export const googleMapsConfig = {
  apiKey: 'AIzaSyCaEJBv9cnWruEEq1gyWOJgxZbD_F7nu_I'
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
    ProfileComponent,
    PlayersFollowedComponent,
    ClubsFollowedComponent,
    TeamComponent,
    PlayerComponent,
    ClubComponent,
    PostComponent,
    SearchComponent,
    ResultsComponent,
    SponsorsComponent,
    FixtureComponent,
    HomeComponent,
    NearbyFixturesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    TabViewModule,
    DataListModule,
    DialogModule,
    RouterModule,
    MomentModule,
    ToastModule.forRoot(),
    TranslateModule.forRoot(),
    InfiniteScrollModule,
    AgmCoreModule.forRoot(googleMapsConfig)
  ],
  providers: [
    AuthService,
    UserDataService,
    AuthGuardService,
    UnauthGuardService,
    PostDataService,
    SendtoService,
    GeolocationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
