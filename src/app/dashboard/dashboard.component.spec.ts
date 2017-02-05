/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { AuthService} from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';

import {firebaseConfig} from '../app.module';
import { DashboardComponent } from './dashboard.component';
import {PostDataService} from '../services/post-data.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers : [
        { provide : AngularFire, useClass: AngularFire },
        { provide: AuthService, useClass: AuthService},
        { provide: Router, useClass: RouterStub },
        { provide: PostDataService, useClass: PostDataService}
        ],
        imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
