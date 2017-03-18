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

  comments: any = [];
  commentsLimit = 2;

  showBtn = [];
  likes = [];
  testLikes = [];
  users = [];
  likeLength = 0;

  liked;

  currentComLen;
  newComment = '';

  currentUserId;
  userData;

  editComment = {
    comment: '',
    author_name: '',
    author_avatar: '',
    author: '',
    commented_at: 0,
    $key: '',
    likes: [],
    noLikes: 0
  };

  editedText = '';

  constructor ( private af: AngularFire,
                private authService: AuthService,
                private postDataService: PostDataService,
                private router: Router
              ) {}

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
        });

      this.af.database.list('posts/' + this.post.id + '/comments', {
        query: {
          orderByChild: 'commented_at',
          limitToFirst: this.commentsLimit
        }
      }).subscribe(comments => {
        this.comments = comments;
        this.currentComLen = this.comments.length;
      });

      this.af.database.list('posts/' + this.post.id + '/likes').subscribe(likes => {
        this.likes = likes.map(l => {
          return l.$key;
        });
      });

      this.af.database.list('users/' + this.currentUserId + '/likes').subscribe(likes => {
        this.testLikes = likes.map(l => {
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

  commentLikeToggle(commentid: string, postid: string, uid: string) {

    let commentLikes = [];
    if (commentid) {

      this.af.database.list('posts/' + postid + '/comments/' + commentid + '/likes').subscribe(likes => {
        commentLikes = likes.map(l => {
          return l.$key;
        });
      });

      const observable = this.af.database.object('posts/' + postid + '/comments/' + commentid + '/likes/' + uid);
      const likeObs = this.af.database.object('posts/' + postid + '/comments/' + commentid + '/noLikes');

    if (commentLikes.indexOf(uid) === -1) {
        observable.set({
          liked_at: (new Date().getTime())
        });
        likeObs.$ref.transaction(function(currentCount) {
          return currentCount + 1;
});
    } else {
      observable.remove();
      likeObs.$ref.transaction(function(currentCount) {
        return currentCount - 1;
});
    }
  }
}

  addComment(newComment: string, postid: string ) {
    this.postDataService.getComments(this.post.id).push({
      comment: this.newComment,
      commented_at: (new Date().getTime()),
      author: this.currentUserId,
      author_name: this.userData.name,
      author_avatar: this.userData.avatar,
      likes: [],
      noLikes: 0
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
      author_avatar: this.editComment.author_avatar,
      likes: this.editComment.likes,
      noLikes: this.editComment.noLikes
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
    this.commentsLimit += term;
    this.af.database.list('posts/' + this.post.id + '/comments', {
        query: {
          orderByChild: 'commented_at',
          startAt: 0,
          limitToFirst: this.commentsLimit
        }
      }).subscribe(comments => {
        this.comments = comments;
        this.currentComLen = this.comments.length;
      });
  }

}
