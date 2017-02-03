/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerSearchService } from './player-search.service';
import {firebaseConfig} from "../app.module";
import {AngularFireModule, AngularFire} from "angularfire2";

describe('PlayerSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerSearchService,
        { provide : AngularFire, useClass: AngularFire }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should ...', inject([PlayerSearchService], (service: PlayerSearchService) => {
    expect(service).toBeTruthy();
  }));
});
