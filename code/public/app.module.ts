import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { TranslateModule } from "ng2-translate";
import { AppComponent } from "./app.component";



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot()
    ],
		// forRoot() -> provides and configures services
		// at the same time
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {}
