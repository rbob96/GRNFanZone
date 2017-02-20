/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {TeamComponent} from './team.component';

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

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamComponent,
        PostComponent
      ], providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 'h5m9PT4rgdSYDGzoyOLolYgUaUu1' }]) } },
        { provide: AngularFire, useClass: AngularFire },
        { provide: UserDataService, useClass: MockUserDataService}
        ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        MomentModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get id from Router', () => {
    // The UserId should exist
    expect(component.teamId).toBeTruthy();

    // The UserId should be 5
    expect(component.teamId).toEqual('h5m9PT4rgdSYDGzoyOLolYgUaUu1');

  });

});
