import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate";


@Component({
    selector: "gnr-app",
    template: `
		<h1> WELCOME TO GNR FANZONE </h1>
    <div [innerHTML]="'HELLO' | translate"></div>
		`
})

export class AppComponent {

    // By default, only the TranslateStaticLoader is available.
    // It will search for files in i18n/*.json,
    // if you want you can customize this behavior by changing the default
    // prefix/suffix:


    constructor(private translate: TranslateService) {

        translate.get("HELLO", { value: "world" }).subscribe((res: string) => {
            console.log(res); // => THIS GETS YOU HELLO WORLD
        });

        translate.setDefaultLang("en");
        translate.use("en");
    }

}
