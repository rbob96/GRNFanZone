import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../profile/profile.component.css'],
  providers: [ ]
})



export class ProfileComponent implements OnInit, OnDestroy {
  // User id
  UserId: number;
  // Subscription to route params
  private sub: any;

  constructor( private route: ActivatedRoute ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.UserId = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
