import { NgModule } from '@angular/core';
import { TranslateModule } from 'ng2-translate';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { routing } from './app.routing';
import { AuthService } from './services/auth.service';

export const firebaseConfig = {
    apiKey: 'AIzaSyCoo25Hw0ftCZHYtQx73gOvbu7SS4YCXW8',
    authDomain: 'grnfanzone.firebaseapp.com',
    databaseURL: 'https://grnfanzone.firebaseio.com',
    storageBucket: 'grnfanzone.appspot.com',
    messagingSenderId: '90265713781'
  };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }