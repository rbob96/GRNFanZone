import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2';


@Injectable()
export class UnauthGuardService implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean>|boolean {
    return this.auth.map((auth) => {
      if (!auth) {
        return true;
      }
      this.router.navigateByUrl('/');
      return false;
    });
  }
}
