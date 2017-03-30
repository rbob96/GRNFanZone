/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {AngularFireModule, AngularFire} from 'angularfire2';
import {firebaseConfig} from '../app.module';
import {RouterStub} from '../../testing/router-stubs';
import {Router} from '@angular/router';
import {TranslateLoader, TranslateService, TranslateParser, TranslateModule} from 'ng2-translate';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {provide: AngularFire, useClass: AngularFire},
        {provide: Router, useClass: RouterStub},
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
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
