/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendtoService } from './sendto.service';
import {Router} from '@angular/router';
import {RouterStub} from '../../testing/router-stubs';

describe('SendtoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SendtoService,
        { provide: Router, useClass: RouterStub },
      ]
    });
  });

  it('should exist', inject([SendtoService], (service: SendtoService) => {
    expect(service).toBeTruthy();
  }));
});
