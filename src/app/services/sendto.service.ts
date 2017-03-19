import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class SendtoService {

  constructor(private router: Router) { }

  public user(uid: string) {
    return this.router.navigate(['/user/' + uid]);
  }

  public fixture(uid: string) {
    return this.router.navigate(['/fixture/' + uid]);
  }

  public player(uid: string) {
    return this.router.navigate(['/player/' + uid]);
  }

  public team(uid: string) {
    return this.router.navigate(['/team/' + uid]);
  }

  public club(uid: string) {
    return this.router.navigate(['/club/' + uid]);
  }

  public playersList(uid: string) {
    this.router.navigate(['/playersFollowed/' + uid]);
  }

  public teamsList(uid: string) {
    this.router.navigate(['/teamsFollowed/' + uid]);
  }

  public clubsList(uid: string) {
    this.router.navigate(['/clubsFollowed/' + uid]);
  }


}
