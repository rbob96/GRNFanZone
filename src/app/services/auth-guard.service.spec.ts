/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AngularFireModule, FirebaseAuth } from 'angularfire2';
import { firebaseConfig } from '../app.module';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: Router, useClass: RouterStub },
        { provide : FirebaseAuth, useClass: FirebaseAuth }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should ...', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
