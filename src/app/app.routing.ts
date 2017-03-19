import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';

import {LoginComponent} from './login/login.component';
import {TeamsFollowedComponent} from './teams-followed/teams-followed.component';
import {PlayersFollowedComponent} from './players-followed/players-followed.component';
import {ClubsFollowedComponent} from './clubs-followed/clubs-followed.component';
import {TeamComponent} from './team-profile/team.component';
import {PlayerComponent} from './player-profile/player.component';
import {ClubComponent} from './club-profile/club.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ResultsComponent} from './results/results.component';
import {FixtureComponent} from './fixture/fixture.component';
import {UnauthGuardService} from './services/unauth-guard.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuardService]
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user/:id',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'teamsFollowed/:id',
    component: TeamsFollowedComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'playersFollowed/:id',
    component: PlayersFollowedComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'clubsFollowed/:id',
    component: ClubsFollowedComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'team/:id',
    component: TeamComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'player/:id',
    component: PlayerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'club/:id',
    component: ClubComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'results/:query',
    component: ResultsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'fixture/:id',
    component: FixtureComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
