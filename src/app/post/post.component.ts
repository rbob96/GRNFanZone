import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import Any = jasmine.Any;
import {AuthService} from '../services/auth.service';
import {PostDataService} from '../services/post-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  comments;
  likes = [];

  currentUserId;

  constructor ( private af: AngularFire, private authService: AuthService, private postDataService: PostDataService ) {}

  ngOnInit() {

    this.currentUserId = this.authService.uid;

    if (this.post) {

      this.af.database.list('posts/' + this.post.id + '/comments').subscribe(comments => {
        this.comments = comments;
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

      if (this.likes.indexOf(uid) === -1) {

        console.log('Liking');
        observable.set({
          'liked_at': '2082-12-31T14:50:46.381Z'
        });

      } else {

        observable.remove();

      }
    }

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

}
