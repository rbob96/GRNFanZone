/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileComponent } from './profile.component';

import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';



describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let testActivatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    testActivatedRoute = new ActivatedRouteStub();
    testActivatedRoute.testData = { id: 'h5m9PT4rgdSYDGzoyOLolYgUaUu1' };
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ], providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: testActivatedRoute },
        { provide : AngularFire, useValue: AngularFire }
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

  it('should get id from Router', () => {
    // The UserId should exist
    expect(component.userId).toBeTruthy();

    // The UserId should be 5
    expect(component.userId).toEqual('h5m9PT4rgdSYDGzoyOLolYgUaUu1');

  });

  // it('should access the user from angularfire', () => {
  //      expect(component.profileData).toBeTruthy();
  // })

});
