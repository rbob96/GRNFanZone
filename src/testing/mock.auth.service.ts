import { Injectable } from '@angular/core';

@Injectable()

export class MockAuthService {
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
