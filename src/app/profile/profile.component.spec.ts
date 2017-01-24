/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileComponent } from './profile.component';

import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let testActivatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    testActivatedRoute = new ActivatedRouteStub();
    testActivatedRoute.testData = { id: 5 };
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ], providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: testActivatedRoute },

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
    expect(component.UserId).toBeTruthy();

    // The UserId should be 5
    expect(component.UserId).toEqual(5);

  })

});
