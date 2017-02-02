import { Component, OnInit, OnDestroy} from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import {DashboardDataService} from '../services/dashboard-data.service';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs/Subject';
import {KeysPipe} from './dashboard-component.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html'

})


export class DashboardComponent {

  posts: FirebaseListObservable<any>;

  constructor(private dashboardDataService: DashboardDataService, private authService: AuthService) {
    this.posts = this.dashboardDataService.getDashboardData(this.authService.userDetails.uid);
  }

  addComment(newComment: string, postid: string ) {
    this.dashboardDataService.getComments(postid).push({ comment: newComment });
    this.dashboardDataService.getComments(postid).forEach(comment => {
      console.log(comment);
    });
  }
  updateComment(key: string, newComment: string, postid: string) {
    this.dashboardDataService.getComments(postid).update(key, { comment: newComment });

  }
  deleteComment(key: string, postid: string) {
    this.dashboardDataService.getComments(postid).remove(key);
  }
  deleteEverything(postid) {
    this.dashboardDataService.getComments(postid).remove();
  }
}
