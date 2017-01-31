import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './user-profile/profile/profile.component';

import {LoginComponent} from './login/login.component';
import {TeamsFollowedComponent} from './teams-followed/teams-followed.component';
import {PlayersFollowedComponent} from './players-followed/players-followed.component';
import {TeamComponent} from './team-profile/team.component';
import {PlayerComponent} from './player-profile/player.component';
import {ClubComponent} from './club-profile/club.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ProfileEditComponent} from './user-profile/profile-edit/profile-edit.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path : '',
      component : DashboardComponent,
      canActivate: [ AuthGuardService ]
    },
    {
      path : 'user/:id',
      component : ProfileComponent
    },
    {
      path : 'user/:id/edit',
      component : ProfileEditComponent
    },
    {
      path : 'teamsFollowed',
      component : TeamsFollowedComponent},
      {
        path : 'playersFollowed',
        component : PlayersFollowedComponent
      },
      {
        path : 'team',
        component : TeamComponent
      },
      {
        path : 'player',
        component : PlayerComponent
      },
      {
        path : 'club',
        component : ClubComponent
      }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
