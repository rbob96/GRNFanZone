/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileComponent } from './profile.component';

import { Router, ActivatedRoute } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';

import {firebaseConfig, googleMapsConfig} from '../app.module';
import {Observable} from 'rxjs';
import {UserDataService} from '../services/user-data.service';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {MockAuthService} from '../../testing/mock.auth.service';
import {AuthService} from '../services/auth.service';
import {MockUserDataService, testUser} from '../../testing/mock.user-data.service';
import {TranslateLoader, TranslateService, TranslateParser, TranslateModule} from 'ng2-translate';
import {SendtoService} from '../services/sendto.service';
import {NearbyFixturesComponent} from '../nearby-fixtures/nearby-fixtures.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MomentModule} from 'angular2-moment';
import {GeolocationService} from '../services/geolocation.service';
import {MockGeolocationService} from '../../testing/mock.geolocation.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        NearbyFixturesComponent
      ], providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 'h5m9PT4rgdSYDGzoyOLolYgUaUu1' }]) } },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: AngularFire, useClass: AngularFire },
        { provide: AuthService, useClass: MockAuthService},
        TranslateLoader,
        TranslateService,
        TranslateParser,
        SendtoService,
        { provide: GeolocationService, useClass: MockGeolocationService},
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        TranslateModule,
        MomentModule,
        AgmCoreModule.forRoot(googleMapsConfig),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve profile data from user data service', () => {
    expect( component.profileData ).toEqual( Observable.from([testUser]) );
  });

  it('should get id from Router', () => {
    // The UserId should exist
    expect(component.userId).toBeTruthy();

    // The UserId should be 5
    expect(component.userId).toEqual('h5m9PT4rgdSYDGzoyOLolYgUaUu1');

  });

});
