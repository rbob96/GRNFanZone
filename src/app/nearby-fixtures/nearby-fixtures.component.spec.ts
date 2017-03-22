/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NearbyFixturesComponent } from './nearby-fixtures.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {googleMapsConfig, firebaseConfig} from '../app.module';
import {MomentModule} from 'angular2-moment';
import {GeolocationService} from '../services/geolocation.service';
import {MockGeolocationService} from '../../testing/mock.geolocation.service';
import {AngularFire, AngularFireModule} from 'angularfire2';

describe('NearbyFixturesComponent', () => {
  let component: NearbyFixturesComponent;
  let fixture: ComponentFixture<NearbyFixturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyFixturesComponent ],
      providers: [
        { provide: GeolocationService, useClass: MockGeolocationService},
        { provide: AngularFire, useClass: AngularFire }
      ],
      imports: [
        AgmCoreModule.forRoot(googleMapsConfig),
        MomentModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
