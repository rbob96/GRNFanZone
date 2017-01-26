import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {DashboardDataService} from '../services/dashboard-data.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html'

})

export class DashboardComponent {

  posts: FirebaseListObservable<any>;
  // curComment: string;
  constructor(private dashboardDataService: DashboardDataService, private authService: AuthService) {
    this.posts = this.dashboardDataService.getDashboardData(this.authService.userDetails.uid);
  }


  /*public setComment(postid: string) {
    console.log(this.curComment, this.authService.userDetails.uid, postid );
    this.dashboardDataService.setComment(this.curComment, this.authService.userDetails.uid, postid);
  }*/
}
