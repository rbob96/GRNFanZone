import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()

export class DashboardDataService {

  constructor(private af: AngularFire) {}

  public getDashboardData (uid: string) {

    const queryList = this.af.database.list('/posts', {
      query: {
        orderByChild : 'created_at',
        limitToFirst : 100
      }
    });

    return queryList;

  }

  /*public setComment(comment: string, uid: string, postid: string) {
    this.af.database.list('/posts/' + postid + '/comments').push({comment : comment});
  }*/
}
