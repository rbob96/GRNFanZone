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

  constructor(private postDataService: PostDataService,
              private authService: AuthService,
              private af: AngularFire,
              private router: Router) {

    this.currentUserId = authService.uid;

      af.database.object('users/' + this.currentUserId).subscribe(userData => {
          af.database.list('posts').subscribe(posts => {

            this.posts = [];

            posts.forEach(post => {

              if (userData.players_followed != null &&
                  post.posted_by in userData.players_followed) {
                this.posts.push(post);
              } else if (userData.teams_followed != null &&
                         post.posted_by in userData.teams_followed) {
                this.posts.push(post);
              } else if (userData.clubs_followed != null && 
                         post.posted_by in userData.clubs_followed) {
                this.posts.push(post);
              }
            });
            this.posts.sort((a, b) => b.created_at - a.created_at);
            if (this.posts.length >= this.postsLimit) {
              this.shownPostAmount += this.postsLimit;
            } else {
              this.shownPostAmount = this.posts.length;
            }
            this.shownPosts = this.posts.slice(0, this.shownPostAmount);
          });
      });

  }

  ngOnInit(){

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
