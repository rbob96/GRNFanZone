import { Injectable } from '@angular/core';
import {FirebaseObjectObservable} from "angularfire2";

@Injectable()

export class MockUserDataService {


  constructor() {}

  getUserData (uid: string){

    let user = {
      name: 'Andrew Thompson',
      avatar: 'https://upload.wikimedia.org/wikipedia/en/4/4e/Elijah_Wood_as_Frodo_Baggins.png',
      email: 'athompson@example.com',
      teams_followed : {
        'dc97175a-0526-4284-a3f8-4dd8a3939183' : {
          avatar : 'https://example.com/avatar.png',
          id : 'dc97175a-0526-4284-a3f8-4dd8a3939183',
          name : 'Glasgow Tigers 1st XV'
        },
      },
      players_followed : {
        '4b98f89b-5d18-4b00-8c2a-c9d95d1d9bf0' : {
          avatar : 'https://example.com/avatar.png',
          first_name : 'Owen',
          id : '4b98f89b-5d18-4b00-8c2a-c9d95d1d9bf0',
          last_name : 'Jones'
        }
      },
      clubs_followed : {
        '38340c64-9a12-5548-ae4f-f8bd48001bac' : {
          avatar : 'http://i.pravatar.cc/200',
          id : '38340c64-9a12-5548-ae4f-f8bd48001bac',
          name : 'Jason Mann'
        }
      }
    }

    return FirebaseObjectObservable.create(user);

  }

}
