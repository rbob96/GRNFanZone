import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Routes } from '@angular/router';

@Injectable()

export class AuthService {
  displayName;
  photoURL;
  authState;

  constructor(private af: AngularFire) {

      this.af.auth.subscribe(authState => {
      if (!authState) {

        this.displayName = null;
        this.photoURL = null;
        return;

      }

      this.displayName = authState.auth.displayName;
      this.photoURL = authState.auth.photoURL;
    });
  }


  login(from: string) {
    this.af.auth.login( {
      provider: this.getProvider(from),
      method: AuthMethods.Popup
    }).then(authState => {
      console.log('AFTER LOGIN', authState);
    });
  }

  logout() {
    this.af.auth.logout();
  }


  private getProvider(from: String) {

    switch (from) {
      case 'facebook': return AuthProviders.Facebook;
      case 'google': return AuthProviders.Google;
    }

  }
}
