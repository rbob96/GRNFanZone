import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../profile/profile.component.css'],
  providers: [ ]
})



export class ProfileComponent implements OnInit {
  // Subscription to route params
  private sub: any;

  // User id
  userId: string;

  // userObject
  profileData: FirebaseObjectObservable<any>;

  constructor( private route: ActivatedRoute, private af: AngularFire ) {}

  ngOnInit() {
    // Activated Route unsubscribed from by router, so not necessary to
    // implement ngOnDestroy()
    this.sub = this.route.params.subscribe(params => {
       this.userId = params['id'];

       // Now generate code to get the data for this user...
       // Think this is correct, but tests don't like it


    });
  }



}
