/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDataService } from './dashboard-data.service';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';

describe('DashboardDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardDataService,
        { provide : AngularFire, useClass: AngularFire }
        ],
        imports: [
          AngularFireModule.initializeApp(firebaseConfig)
        ]
    });
  });

  it('should ...', inject([DashboardDataService], (service: DashboardDataService) => {
    expect(service).toBeTruthy();
  }));
});
