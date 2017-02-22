/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResultsComponent } from './results.component';
import {Router, ActivatedRoute} from '@angular/router';
import {RouterStub} from '../../testing/router-stubs';
import {Observable} from 'rxjs';
import {AngularFire, AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../app.module';
import {TranslateLoader, TranslateService, TranslateParser, TranslateModule} from 'ng2-translate';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'query': 'Hopkins' }]) } },
        {provide: AngularFire, useClass: AngularFire},
        TranslateLoader,
        TranslateService,
        TranslateParser
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        TranslateModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
