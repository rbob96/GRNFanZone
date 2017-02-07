/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostComponent } from './post.component';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';
import {AuthService} from '../services/auth.service';
import {RouterStub} from '../../testing/router-stubs';
import {Router} from '@angular/router';
import {PostDataService} from '../services/post-data.service';

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
        { provide: PostDataService, useClass: PostDataService }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
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
