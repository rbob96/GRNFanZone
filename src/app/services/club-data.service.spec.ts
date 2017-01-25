import { TestBed, async, inject } from '@angular/core/testing';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../app.module';
import { ClubDataService } from './club-data.service';

describe('ClubDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClubDataService,
        { provide : AngularFire, useClass: AngularFire }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  it('should create', inject([ClubDataService], (service: ClubDataService) => {
    expect(service).toBeTruthy();
  }));

});
