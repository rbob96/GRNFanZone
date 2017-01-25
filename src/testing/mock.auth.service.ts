import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Routes } from '@angular/router';

@Injectable()

export class AuthService {
  displayName;
  photoURL;
  email;
  authState;

  constructor() {

      this.displayName = 'Andrew McCluskey';
      this.photoURL = 'https://people.cs.umass.edu/~barring/david_3.jpg';
      this.email = 'example@google.com';

  }

  login(from: string) {

  }

  logout() {

  }

}
