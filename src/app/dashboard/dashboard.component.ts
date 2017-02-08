import { Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {PostDataService} from '../services/post-data.service';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})


export class DashboardComponent {

  posts = [];
  currentUserId: string;

  constructor(private postDataService: PostDataService, private authService: AuthService, af: AngularFire) {

    this.currentUserId = authService.uid;

      af.database.object('users/' + this.currentUserId).subscribe(userData => {
        af.database.list('posts').subscribe(posts => {

          this.posts = [];

          posts.forEach(post => {

            if (post.posted_by in userData.players_followed) {
              this.posts.push(post);
            } else if (post.posted_by in userData.teams_followed) {
              this.posts.push(post);
            } else if (post.posted_by in userData.clubs_followed) {
              this.posts.push(post);
            }

        });


      });
    });

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
