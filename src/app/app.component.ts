import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-gnr',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    // By default, only the TranslateStaticLoader is available.
    // It will search for files in i18n/*.json,
    // if you want you can customize this behavior by changing the default
    // prefix/suffix:


    constructor(
    private af:	AuthService) {

    }

}
