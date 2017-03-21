/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ResultsComponent} from '../results/results.component';
import {PostComponent} from '../post/post.component';
import {TranslateParser, TranslateService, TranslateLoader, TranslateModule} from 'ng2-translate';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {RouterStub} from '../../testing/router-stubs';
import {PostDataService} from '../services/post-data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        DashboardComponent,
        ResultsComponent,
        PostComponent
      ],
      providers: [
        { provide : AngularFire, useClass: AngularFire },
        { provide: AuthService, useClass: AuthService},
        { provide: Router, useClass: RouterStub },
        { provide: PostDataService, useClass: PostDataService},
        TranslateLoader,
        TranslateService,
        TranslateParser
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
