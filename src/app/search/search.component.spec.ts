/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {PlayerDataService} from '../services/player-data.service';
import {AngularFireModule, AngularFire} from 'angularfire2';
import {firebaseConfig} from '../app.module';
import {RouterStub} from '../../testing/router-stubs';
import {Router} from '@angular/router';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        PlayerDataService,
        {provide: AngularFire, useClass: AngularFire},
        {provide: Router, useClass: RouterStub},
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
