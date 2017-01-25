import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()

export class DashboardDataService {

  constructor(private af: AngularFire) {}

  public getDashboardData (uid: string) {

    return this.af.database.list('/posts', {
      query: {
        orderByChild : 'created_at',
        limitToFirst : 100
      }
    });

  }
}