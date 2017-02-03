/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerSearchService } from './player-search.service';

describe('PlayerSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerSearchService]
    });
  });

  it('should ...', inject([PlayerSearchService], (service: PlayerSearchService) => {
    expect(service).toBeTruthy();
  }));
});
