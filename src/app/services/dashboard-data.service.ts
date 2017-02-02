import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
@Injectable()

export class DashboardDataService {

  constructor(private af: AngularFire) {}

  public getDashboardData (uid: string) {

    const queryList = this.af.database.list('/posts', {
      query: {
        orderByChild : 'created_at',
        limitToFirst : 100,
        preserveSnapshot: true
      }
    });

    return queryList;

  }

  public getPostCommets (postid: string) {
    const postComments = this.af.database.list('/posts/' + postid + '/comments');
  }

  public getDatabase () {
    return this.af.database;
  }

  public getComments(postid: string) {
    return this.af.database.list('/posts/' + postid + '/comments');
  }
}
