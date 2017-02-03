import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {TeamsFollowedComponent} from './teams-followed/teams-followed.component';
import {PlayersFollowedComponent} from './players-followed/players-followed.component';
import {TeamComponent} from './team-profile/team.component';
import {PlayerComponent} from './player-profile/player.component';
import {ClubComponent} from './club-profile/club.component';
import {ListComponent} from './list/list.component';
import {AuthGuardService} from './services/auth-guard.service';

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
      path : 'list',
      component : ListComponent
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
