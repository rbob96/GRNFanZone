import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {DashboardDataService} from '../services/dashboard-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html',

})

export class DashboardComponent implements OnInit {

  posts : FirebaseListObservable<any>;
  constructor(private dashboardDataService: DashboardDataService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.posts = this.dashboardDataService.getDashboardData(params['id']);
    });
  }
}
