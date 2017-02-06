import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import Any = jasmine.Any;
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  comments;

  currentUserId;

  constructor ( private af: AngularFire, private authService: AuthService ) {}

  ngOnInit() {

    this.currentUserId = this.authService.uid;

    if (this.post) {
      this.af.database.list('posts/' + this.post.id + '/comments').subscribe(comments => {
        this.comments = comments;
      });
    }

  }

  likePost(uid: string) {
    if (this.post) {
      const likes = this.af.database.list('posts/' + this.post.id + '/likes');
      likes.push(
        {
          uid: {
            'liked_at': '2082-12-31T14:50:46.381Z'
          }
        }
      );
    }

  }

  unlikePost(uid: string) {
    if (this.post) {
      const likes = this.af.database.list('posts/' + this.post.id + '/likes');
      likes.remove(uid);
    }
  }

}
