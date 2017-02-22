/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MomentModule } from 'angular2-moment';

import { PostComponent } from './post.component';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';
import {AuthService} from '../services/auth.service';
import {RouterStub} from '../../testing/router-stubs';
import {Router} from '@angular/router';
import {PostDataService} from '../services/post-data.service';
import {TranslateParser, TranslateLoader, TranslateService, TranslateModule} from 'ng2-translate';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostComponent
      ],
      providers: [
        { provide : AngularFire, useClass: AngularFire },
        { provide: AuthService, useClass: AuthService },
        { provide: Router, useClass: RouterStub },
        { provide: PostDataService, useClass: PostDataService },
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
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
