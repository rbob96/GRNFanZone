import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  userDetails = {
    displayName: null,
    photoURL: null,
    email: null,
    uid: null
  };

  uid: string;

  authState;
  registered;

  constructor(private router: Router, private af: AngularFire) {
      
      this.af.auth.subscribe(authState => {

        if (!authState) {

          this.userDetails.displayName = null;
          this.userDetails.photoURL = null;
          this.userDetails.email = null;
          this.userDetails.uid = null;
          this.uid = null;

          this.registered = false;

          return;

        }

        this.userDetails.displayName = authState.auth.displayName;
        this.userDetails.photoURL = authState.auth.photoURL;
        this.userDetails.email = authState.auth.email;
        this.userDetails.uid = authState.auth.uid;
        this.uid = authState.auth.uid;
        this.registered = true;

        });
  }

  currentUser() {

  }

  login(from: string) {
    this.af.auth.login( {
      provider: this.getProvider(from),
      method: AuthMethods.Popup
    }).then(authState => {
      this.af.database.object('/users/' + authState.uid).update({
          name  : authState.auth.displayName,
          email : authState.auth.email,
          avatar: authState.auth.photoURL
        });
      this.router.navigate(['/']);
    });
  }
  logout() {
    this.af.auth.logout();
    this.router.navigate(['/login']);
  }
  private getProvider(from: String) {
    switch (from) {
      case 'facebook': return AuthProviders.Facebook;
      case 'google': return AuthProviders.Google;
    }
  }
}
