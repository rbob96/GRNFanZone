/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchComponent } from './search.component';
import {PlayerSearchService} from "../services/player-search.service";
import {AngularFireModule, AngularFire} from "angularfire2";
import {firebaseConfig} from "../app.module";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        PlayerSearchService,
        { provide : AngularFire, useClass: AngularFire }
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
