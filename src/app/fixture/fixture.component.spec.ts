/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FixtureComponent } from './fixture.component';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {RouterStub} from '../../testing/router-stubs';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {Observable} from 'rxjs';
import {MomentModule} from 'angular2-moment';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {firebaseConfig, googleMapsConfig} from '../app.module';
import {SendtoService} from '../services/sendto.service';

describe('FixtureComponent', () => {
  let component: FixtureComponent;
  let fixture: ComponentFixture<FixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 'h5m9PT4rgdSYDGzoyOLolYgUaUu1' }]) } },
        { provide: AngularFire, useClass: AngularFire },
        { provide: SendtoService, useClass: SendtoService}
        ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        RouterModule,
        MomentModule,
        AgmCoreModule.forRoot(googleMapsConfig)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
