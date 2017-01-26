/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../app.module';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import {AuthService} from './auth.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide : AuthService, useClass: AuthService },
        { provide: Router, useClass: RouterStub }
        ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should create', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
