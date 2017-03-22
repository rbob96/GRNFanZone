import {Component, Input, OnInit} from '@angular/core';
import { Post } from '../post';
import {AngularFire} from 'angularfire2';
import Any = jasmine.Any;
import {AuthService} from '../services/auth.service';
import {PostDataService} from '../services/post-data.service';
import {Router} from '@angular/router';
import {SendtoService} from '../services/sendto.service';



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
  expandComs = -3;
  shownComs = [];
  likes = [];
  showBtn = [];
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
    noLikes: 0,
    likedBy: ''
  };

  editedText = '';

  constructor ( private af: AngularFire,
                private authService: AuthService,
                private postDataService: PostDataService,
                private router: Router,
                private sendto: SendtoService
              ) {}

  ngOnInit() {

    this.currentUserId = this.authService.uid;

    this.af.database.object('users/' + this.currentUserId).subscribe(user => {
      this.userData = user;
    });

    if (this.post) {
      this.postDataService.getComments(this.post.id).subscribe(resComms => {
          this.showBtn = [];
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

  commentLikeToggle(commentid: string, postid: string, uid: string) {

    let commentLikes = [];
    if (commentid) {

      // TODO: Fix likes
      // this.af.database.list('posts/' + postid + '/comments/' + commentid + '/likes').subscribe(likes => {
      //   commentLikes = likes.map(l => {
      //     return l.$key;
      //   });
      // });

      const observable = this.af.database.object('posts/' + postid + '/comments/' + commentid + '/likes/' + uid);
      const likeObs = this.af.database.object('posts/' + postid + '/comments/' + commentid + '/noLikes');
      const likedByObs = this.af.database.object('posts/' + postid + '/comments/' + commentid + '/likedBy');
    if (commentLikes.indexOf(uid) === -1) {
        observable.set({
          liked_at: (new Date().getTime())
        });
        likeObs.$ref.transaction(function(currentCount) {
          return currentCount + 1;
});
      likedByObs.$ref.transaction(function(text){
        return text + ' ' + uid;
      });
    } else {
      observable.remove();
      likeObs.$ref.transaction(function(currentCount) {
        return currentCount - 1;
});
    likedByObs.$ref.transaction(function (text) {
        const str = text.replace(uid, '');
        return str;
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
      noLikes: 0,
      likedBy: ''
    }).then( _ => {
      this.newComment = '';
      this.commentsLimit -= 1;
    });
  }

  deleteComment(key: string, postid: string) {
    this.postDataService.getComments(postid).remove(key);
    this.commentsLimit += 1;
  }

  updateComment() {

    this.postDataService.getComments(this.post.id).update(this.editComment.$key, {
      comment: this.editedText,
    });

  }

  setEditComment(comment) {
    this.editComment = comment;
    this.editedText = comment.comment;
  }

  sendToAuthor() {
    if (this.post.poster === 'players') {
      return this.sendto.player(this.post.posted_by);
    } else if (this.post.poster === 'teams') {
      return this.sendto.team(this.post.posted_by);
    } else if (this.post.poster === 'clubs') {
      return this.sendto.club(this.post.posted_by);
    }
  }

  showMore(term: number) {
    this.expandComs -= term;
    this.commentsLimit -= term;
    this.shownComs = this.showBtn.slice(this.expandComs);
  }
}
