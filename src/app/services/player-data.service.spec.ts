import { TestBed, async, inject } from '@angular/core/testing';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';
import {PlayerDataService} from './player-data.service';

describe('PlayerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerDataService,
        { provide : AngularFire, useClass: AngularFire }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should create', inject([PlayerDataService], (service: PlayerDataService) => {
    expect(service).toBeTruthy();
  }));

});
