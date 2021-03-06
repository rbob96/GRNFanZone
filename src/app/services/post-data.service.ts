import { Injectable } from '@angular/core';
import {AngularFire} from 'angularfire2';
@Injectable()

export class PostDataService {

  posts;

  constructor(private af: AngularFire) {
    af.database.list('/posts').subscribe(posts => {
      this.posts = posts;
    });
  }

  public getComments(postid: string) {
    return this.af.database.list('/posts/' + postid + '/comments');
  }

}
