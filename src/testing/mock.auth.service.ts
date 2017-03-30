import { Injectable } from '@angular/core';

@Injectable()

export class MockAuthService {
  userDetails = {
    displayName: 'Andrew McCluskey',
    photoURL: 'https://people.cs.umass.edu/~barring/david_3.jpg',
    email: 'example@google.com',
    uid: 'ABCD'
  };
  authState;

  constructor() {}

  login(from: string) {

  }

  logout() {

  }

}
