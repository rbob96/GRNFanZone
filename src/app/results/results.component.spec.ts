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
import {UserDataService} from '../services/user-data.service';
import {MockUserDataService, testUser} from '../../testing/mock.user-data.service';
import {SendtoService} from '../services/sendto.service';

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
        { provide: UserDataService, useClass: MockUserDataService},
        TranslateLoader,
        TranslateService,
        TranslateParser,
        SendtoService
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

    spyOn(component, 'findPlayers');
    spyOn(component, 'findTeams');
    spyOn(component, 'findClubs');
    spyOn(component, 'findFixtures');


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get query from Router', () => {
    // The UserId should exist
    expect(component.searchTerm).toBeTruthy();

    // The search term should be this :
    expect(component.searchTerm).toEqual('Hopkins');

  });

  it('should call "find" functions in ngOnInit', () => {

    component.ngOnInit();
    expect(component.findPlayers).toHaveBeenCalled();
    expect(component.findTeams).toHaveBeenCalled();
    expect(component.findClubs).toHaveBeenCalled();
    expect(component.findFixtures).toHaveBeenCalled();

  });

});
