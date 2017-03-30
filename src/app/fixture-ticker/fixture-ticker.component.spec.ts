import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureTickerComponent } from './fixture-ticker.component';
import {MomentModule} from 'angular2-moment';
import {AuthService} from '../services/auth.service';
import {firebaseConfig} from '../app.module';
import {AngularFireModule, AngularFire} from 'angularfire2';
import {SendtoService} from '../services/sendto.service';
import {RouterStub} from '../../testing/router-stubs';
import {Router} from '@angular/router';
import {MockAuthService} from '../../testing/mock.auth.service';

describe('FixtureTickerComponent', () => {
  let component: FixtureTickerComponent;
  let fixture: ComponentFixture<FixtureTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureTickerComponent ],
      imports: [
        MomentModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: SendtoService, useClass: SendtoService},
        { provide: AngularFire, useClass: AngularFire },
        { provide: AuthService, useClass: MockAuthService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
