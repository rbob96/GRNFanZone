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
import {PostComponent} from '../post/post.component';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {SendtoService} from '../services/sendto.service';
import {ClubsFollowedComponent} from './clubs-followed.component';

describe('ClubsFollowedComponent', () => {
  let component: ClubsFollowedComponent;
  let fixture: ComponentFixture<ClubsFollowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClubsFollowedComponent
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
    fixture = TestBed.createComponent(ClubsFollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get id from Router', () => {
    // The UserId should exist
    expect(component.userId).toBeTruthy();

    // The UserId should be this :
    expect(component.userId).toEqual('h5m9PT4rgdSYDGzoyOLolYgUaUu1');

  });


});
