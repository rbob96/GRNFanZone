import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {TeamsFollowedComponent} from './teams-followed/teams-followed.component';
import {PlayersFollowedComponent} from './players-followed/players-followed.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
      path : 'dashboard',
      component : DashboardComponent
    },
    {
      path : 'profile/:id',
      component : ProfileComponent
    },
    {
      path : 'teamsFollowed',
      component : TeamsFollowedComponent},
      {
        path : 'playersFollowed',
        component : PlayersFollowedComponent
      }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
