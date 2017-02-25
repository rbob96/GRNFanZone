import { Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {PostDataService} from '../services/post-data.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})


export class DashboardComponent {

  posts = [];
  postsLimit = 2;
  shownPostAmount = 0;
  shownPosts = [];
  currentUserId: string;
  userData;

  constructor(private postDataService: PostDataService,
              private authService: AuthService,
              private af: AngularFire,
              private router: Router) {

          this.af.database.object('users/' + authService.uid).subscribe(userData => {
            console.log('user ret');
            this.userData = userData;
          });

          af.database.list('posts').subscribe(posts => {

            this.posts = [];
            console.log('posts ret');
            posts.forEach(post => {
              if (this.userData.players_followed != null &&
                  post.posted_by in this.userData.players_followed) {
                this.posts.push(post);
              } else if (this.userData.teams_followed != null &&
                         post.posted_by in this.userData.teams_followed) {
                this.posts.push(post);
              } else if (this.userData.clubs_followed != null &&
                         post.posted_by in this.userData.clubs_followed) {
                this.posts.push(post);
              }
            });
            if (this.posts.length === 0 && this.router.url === '/') {
              this.router.navigate(['results']);
            }
            this.posts.sort((a, b) => b.created_at - a.created_at);
            if (this.posts.length >= this.postsLimit) {
              this.shownPostAmount += this.postsLimit;
            } else {
              this.shownPostAmount = this.posts.length;
            }
            this.shownPosts = this.posts.slice(0, this.shownPostAmount);
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
  showMore() {
    if (this.posts.length - this.shownPostAmount >= this.postsLimit) {
      this.shownPostAmount += this.postsLimit;
    } else {
      this.shownPostAmount = this.posts.length;
    }
    this.shownPosts = this.posts.slice(0, this.shownPostAmount);
  }


}
