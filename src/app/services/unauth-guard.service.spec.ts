/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnauthGuardService } from './unauth-guard.service';
import {AngularFireAuth, AngularFireModule} from 'angularfire2';
import {RouterStub} from '../../testing/router-stubs';
import {Router} from '@angular/router';
import {firebaseConfig} from '../app.module';

describe('UnauthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      UnauthGuardService,
      { provide : AngularFireAuth, useClass: AngularFireAuth },
      { provide: Router, useClass: RouterStub }
    ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should exist', inject([UnauthGuardService], (service: UnauthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
