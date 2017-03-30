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


  describe('distance()', () => {

    it ('should return 0 when coords are the same', () => {

      // Check it's 0, rounded to nearest int
      expect(NearbyFixturesComponent.distance(
        55.8856149,
        -4.2892879,
        55.8856149,
        -4.2892879)).toBeCloseTo(0, 0);

    });

    it('should get distance from University of Glasgow to Riverside Museum', () => {

      // Google maps reports it as 1.37 km
      // -1 in close to should get to nearest 10 metres
      expect(NearbyFixturesComponent.distance(
        55.8651907,
        -4.3065124,
        55.8721089,
        -4.2883003)).toBeCloseTo(1370, -1);

    });

    it('should get distance from Glasgow to New York', () => {

      // Google says about 5160 km -> 5,160,000 metres
      // should be within 100 km accurate
      expect(NearbyFixturesComponent.distance(
        55.8642,
        -4.2518,
        40.7128,
        -74.0059)).toBeCloseTo(5160000, -5);

    });


  });

});
