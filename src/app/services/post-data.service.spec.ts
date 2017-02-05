/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostDataService} from './post-data.service';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';

describe('PostDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostDataService,
        { provide : AngularFire, useClass: AngularFire }
        ],
        imports: [
          AngularFireModule.initializeApp(firebaseConfig)
        ]
    });
  });

  it('should ...', inject([PostDataService], (service: PostDataService) => {
    expect(service).toBeTruthy();
  }));
});
