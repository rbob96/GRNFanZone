import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import {Key} from 'ts-keycode-enum';

const konami: any =  Observable.from([
  Key.UpArrow,
  Key.UpArrow,
  Key.DownArrow,
  Key.DownArrow,
  Key.LeftArrow,
  Key.RightArrow,
  Key.LeftArrow,
  Key.RightArrow,
  Key.B,
  Key.A
]);


@Component({
  selector: 'app-gnr',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  easterEgg = false;

  constructor(private af:	AuthService) {

    // A little easter egg :)
    // Code adapted from:
    // http://stackoverflow.com/questions/42463223/
    // adding-types-to-observables-keyboard-events-with-typescript-and-angular-2

    const keys: any = Observable
      .fromEvent(document, 'keyup')
      .map((e: KeyboardEvent) => e.keyCode);

    console.log(keys);

    const matches: any = keys.bufferCount(10, 1)
      .mergeMap(
        (last10: any) =>
          Observable.from(last10)
            .sequenceEqual(konami)
      );

    matches.subscribe(matched => {
      this.easterEgg = true;
    });
    // Easter egg ends

  }


}
