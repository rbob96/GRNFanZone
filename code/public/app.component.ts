import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate";


@Component({
    selector: "gnr-app",
    templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

    // By default, only the TranslateStaticLoader is available.
    // It will search for files in i18n/*.json,
    // if you want you can customize this behavior by changing the default
    // prefix/suffix:


    constructor(
		private translate: TranslateService,
		private af:	AuthService) {


        translate.setDefaultLang("en");
        translate.use("en");
    }

}
