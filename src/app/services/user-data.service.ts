import { Injectable } from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from "angularfire2";

@Injectable()
export class UserDataService {

  constructor(private af: AngularFire) {}

  public getUserData(uid: string){

    return this.af.database.object('/users/' + uid);

  }

  public setUserData(uid: string, userObject: any){

    //sanity checks
    if (userObject.email && userObject.name && userObject.avatar) {
      //Get db observable
      const userObservable = this.af.database.object('/users/' + uid);
      //Update (destructive)
      userObservable.set({
        avatar: userObject.avatar,
        email: userObject.email,
        name: userObject.name
      });
    }

  }

}
