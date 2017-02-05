import { Component, OnInit, OnDestroy} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {PostDataService} from '../services/post-data.service';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html'

})


export class DashboardComponent {

  posts;
  user: FirebaseObjectObservable<any>;

  constructor(private postDataService: PostDataService, private authService: AuthService) {

    this.posts = this.postDataService.getUserFollowingPosts(this.authService.userDetails.uid);
  }

  addComment(newComment: string, postid: string ) {
    this.postDataService.getComments(postid).push({ comment: newComment });
    this.postDataService.getComments(postid).forEach(comment => {
      console.log(comment);
    });
  }
  updateComment(key: string, newComment: string, postid: string) {
    this.postDataService.getComments(postid).update(key, { comment: newComment });
  }
  deleteComment(key: string, postid: string) {
    this.postDataService.getComments(postid).remove(key);
  }
  deleteEverything(postid) {
    this.postDataService.getComments(postid).remove();
  }
}
