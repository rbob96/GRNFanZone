import {Component, Input, OnInit} from '@angular/core';
import { Post } from '../post';
import {AngularFire} from 'angularfire2';
import Any = jasmine.Any;
import {AuthService} from '../services/auth.service';
import {PostDataService} from '../services/post-data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  comments;
  commentsLimit = -3;
  showBtn = [];
  shownComs = [];
  likes = [];

  newComment = '';

  currentUserId;
  userData;

  editComment = {
    comment: '',
    author_name: '',
    author_avatar: '',
    author: '',
    commented_at: 0,
    $key: ''
  };

  editedText = '';

  constructor ( private af: AngularFire,
                private authService: AuthService,
                private postDataService: PostDataService,
                private router: Router
              ) { }

  ngOnInit() {

    this.currentUserId = this.authService.uid;

    this.af.database.object('users/' + this.currentUserId).subscribe(user => {
      this.userData = user;
    });

    if (this.post) {

      const comms = this.postDataService.getComments(this.post.id).subscribe(resComms => {
          resComms.forEach(com => {
            this.showBtn.push(com);
          });
          this.shownComs = this.showBtn.slice(this.commentsLimit);
        });

      this.af.database.list('posts/' + this.post.id + '/likes').subscribe(likes => {
        this.likes = likes.map(l => {
            return l.$key;
        });

      });

    }

  }

  likeToggle(uid: string) {
    if (this.post) {
      const observable = this.af.database.object('posts/' + this.post.id + '/likes/' + uid);

      // Check if uid in likes
      if (this.likes.indexOf(uid) === -1) {

        // Create the like
        observable.set({
          liked_at: (new Date().getTime())
        });

      } else {

        // like
        observable.remove();

      }
    }

  }

  addComment(newComment: string, postid: string ) {
    this.postDataService.getComments(this.post.id).push({
      comment: this.newComment,
      commented_at: (new Date().getTime()),
      author: this.currentUserId,
      author_name: this.userData.name,
      author_avatar: this.userData.avatar
    }).then( _ => {
      this.newComment = '';
    });
  }

  deleteComment(key: string, postid: string) {
    this.postDataService.getComments(postid).remove(key);
  }

  updateComment() {

    this.postDataService.getComments(this.post.id).update(this.editComment.$key, {
      comment: this.editedText,
      commented_at: this.editComment.commented_at,
      author: this.editComment.author,
      author_name: this.editComment.author_name,
      author_avatar: this.editComment.author_avatar
    });

  }

  setEditComment(comment) {
    this.editComment = comment;
    this.editedText = comment.comment;
  }

  sendToAuthor() {
    if (this.post.poster === 'players') {
      this.router.navigate(['/player/' + this.post.posted_by]);
    } else if (this.post.poster === 'teams') {
      this.router.navigate(['/team/' + this.post.posted_by]);
    } else if (this.post.poster === 'clubs') {
      this.router.navigate(['/club/' + this.post.posted_by]);
    }
  }

  showMore(term: number) {
    this.commentsLimit -= term;
    this.shownComs = this.showBtn.slice(this.commentsLimit);
  }
}
