import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()

export class MockGeolocationService {

  public getLocation(opts): Observable<any> {
    return Observable.from([{
      coords: {
        latitude: 1,
        longitude: 1
      }
    }]);
  }

}
