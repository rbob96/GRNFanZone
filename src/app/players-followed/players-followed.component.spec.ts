/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {TranslateModule, TranslateLoader, TranslateService, TranslateParser} from 'ng2-translate';

import { Router, ActivatedRoute } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';

import {firebaseConfig} from '../app.module';
import {Observable} from 'rxjs';
import {UserDataService} from '../services/user-data.service';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {MockUserDataService, testUser} from '../../testing/mock.user-data.service';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {SendtoService} from '../services/sendto.service';
import {PlayersFollowedComponent} from './players-followed.component';

describe('PlayersFollowedComponent', () => {
  let component: PlayersFollowedComponent;
  let fixture: ComponentFixture<PlayersFollowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlayersFollowedComponent
      ], providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 'h5m9PT4rgdSYDGzoyOLolYgUaUu1' }]) } },
        { provide: AngularFire, useClass: AngularFire },
        { provide: UserDataService, useClass: MockUserDataService},
        TranslateLoader,
        TranslateService,
        TranslateParser,
        SendtoService
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        MomentModule,
        FormsModule,
        TranslateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersFollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get id from Router', () => {
    // The UserId should exist
    expect(component.userId).toBeTruthy();

    // The UserId should be 5
    expect(component.userId).toEqual('h5m9PT4rgdSYDGzoyOLolYgUaUu1');

  });

});
