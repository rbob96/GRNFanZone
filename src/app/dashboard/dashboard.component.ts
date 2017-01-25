import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {DashboardDataService} from '../services/dashboard-data.service';
import {AuthService} from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html',

})

export class DashboardComponent implements OnInit {

  posts : FirebaseListObservable<any>;
  curComment : string;
  constructor(private dashboardDataService: DashboardDataService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.posts = this.dashboardDataService.getDashboardData(params['id']);
    });
  }

  public setComment(postid : string){
    console.log(this.curComment, this.authService.userDetails.uid, postid );
    this.dashboardDataService.setComment(this.curComment, this.authService.userDetails.uid, postid);
  }
}
