/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDataService } from './user-data.service';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';

describe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserDataService,
        { provide : AngularFire, useClass: AngularFire }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should ...', inject([UserDataService], (service: UserDataService) => {
    expect(service).toBeTruthy();
  }));
});
