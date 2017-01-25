import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs';

// \\
// This auth guard written here: https://github.com/angular/angularfire2/issues/282
// \\

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: FirebaseAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      });
  }
}
