/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../app.module';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { AngularFireAuth } from 'angularfire2';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFireAuth,
        { provide : AngularFireAuth, useClass: AngularFireAuth },
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
