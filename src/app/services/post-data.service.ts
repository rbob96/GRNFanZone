import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
@Injectable()

export class PostDataService {

  posts;

  constructor(private af: AngularFire) {
    this.posts = af.database.list('/posts').subscribe();
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

  public getUserFollowingPosts (userid: string) {

    // Get all posts:


    // Filter them by only accepting ones the user follows

    // Return the list

  }

}
