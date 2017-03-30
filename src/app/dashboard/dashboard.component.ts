import { Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})


export class DashboardComponent {

  currentUserId: string;
  userData = null;

  posts = [];
  newPosts = [];
  shownPosts = [];

  postsRetrieved = false;
  postsLimit = 2;
  shownPostAmount = 0;
  followed = false;

  constructor(private af: AngularFire,
              private router: Router) {

          // get current user id
          this.af.auth.subscribe(user => {
            if (user) {
              this.currentUserId = user.uid;
            } else {
              this.currentUserId = null;
            }
          });

          // get user data
          this.af.database.object('users/' + this.currentUserId).subscribe(userData => {
            this.userData = userData;
          });

          // get posts from all entities followed by the current user

          af.database.list('posts').subscribe(posts => {
            this.newPosts = [];
            if (this.userData != null) {
              if (this.userData.players_followed != null ||
                  this.userData.teams_followed != null ||
                  this.userData.clubs_followed != null) {
                this.followed = true;
              }
              posts.forEach(post => {

                if (this.userData.players_followed != null &&
                    post.posted_by in this.userData.players_followed) {
                  this.newPosts.push(post);
                } else if (this.userData.teams_followed != null &&
                          post.posted_by in this.userData.teams_followed) {
                  this.newPosts.push(post);
                } else if (this.userData.clubs_followed != null &&
                          post.posted_by in this.userData.clubs_followed) {
                  this.newPosts.push(post);
                }
              });
            }
            this.newPosts.sort((a, b) => b.created_at - a.created_at);
            // Dashboard should only be reloaded when new posts have been made
            if (this.newPosts.length !== this.posts.length) {
              this.posts = this.newPosts;
              if (this.posts.length >= this.postsLimit) {
                this.shownPostAmount += this.postsLimit;
              } else {
                this.shownPostAmount = this.posts.length;
              }
              this.shownPosts = this.posts.slice(0, this.shownPostAmount);
            }
            this.postsRetrieved = true;
          });

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
