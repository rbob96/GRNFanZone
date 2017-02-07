import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
@Injectable()

export class PostDataService {

  posts;

  constructor(private af: AngularFire) {
    af.database.list('/posts').subscribe(posts => {
      this.posts = posts;
    });
  }

  public getRecentPosts (n: number) {

    return this.af.database.list('/posts', {
      query: {
        orderByChild : 'created_at',
        limitToFirst: n
      }
    });

  }

  public getComments(postid: string) {
    return this.af.database.list('/posts/' + postid + '/comments');
  }


}
