import { TestBed, async, inject } from '@angular/core/testing';
import { TeamDataService } from './team-data.service';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';

describe('TeamDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamDataService,
        { provide : AngularFire, useClass: AngularFire }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should create', inject([TeamDataService], (service: TeamDataService) => {
    expect(service).toBeTruthy();
  }));

});
