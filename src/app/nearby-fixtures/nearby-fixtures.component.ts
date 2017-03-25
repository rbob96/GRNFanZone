import {Component, OnInit} from '@angular/core';
import {GeolocationService} from '../services/geolocation.service';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'app-nearby-fixtures',
  templateUrl: './nearby-fixtures.component.html',
  styleUrls: ['./nearby-fixtures.component.css']
})

export class NearbyFixturesComponent implements OnInit {

  userLocation;
  fixtures;

  public static distance(lat1, long1, lat2, long2) {
    // Using the haversine formula to calculate distances
    // Adapted from http://www.movable-type.co.uk/scripts/latlong.html
    const R = 6371e3; // metres
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (long2 - long1) * (Math.PI / 180);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

  }

  constructor(geo: GeolocationService, af: AngularFire) {

    geo.getLocation({
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 0
    }).subscribe(l => {
      this.userLocation = l;
      af.database.list('fixtures').subscribe(fixtures => {
        // Now
        const now = new Date().getTime();
        // Milliseconds in three days
        const threeDays = 259200000;
        this.fixtures = fixtures.filter(f => {
          if (NearbyFixturesComponent.distance(
              this.userLocation.coords.latitude, this.userLocation.coords.longitude,
              f.location.latitude, f.location.longitude) < 7500) {
            if (f.kickoff - now > 0 && f.kickoff < (threeDays + now)) {
              return true;
            }
          }
          return false;
        });
      });
    });


  }

  ngOnInit() {

  }


}
