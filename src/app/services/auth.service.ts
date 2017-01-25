import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Routes } from '@angular/router';

@Injectable()

export class AuthService {
  displayName;
  photoURL;
  authState;
  registered;

  constructor(private af: AngularFire) {

      this.af.auth.subscribe(authState => {
      if (!authState) {

        this.displayName = null;
        this.photoURL = null;
        this.registered = false;
        return;

      }

      this.displayName = authState.auth.displayName;
      this.photoURL = authState.auth.photoURL;
      this.registered = true;
    });
  }


  login(from: string) {
    this.af.auth.login( {
      provider: this.getProvider(from),
      method: AuthMethods.Popup
    }).then(authState => {
      console.log('AFTER LOGIN', authState);
      this.af.database.object('/users/' + authState.uid).update({
          name  : authState.auth.displayName,
          email : authState.auth.email,
          avatar: authState.auth.photoURL
        });
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
