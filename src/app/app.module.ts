import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './routes.config';
import { RouterModule } from '@angular/router';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { AdminComponent } from './containers/admin/admin.component';
import { LoginComponent } from './containers/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginWatcherComponent } from './components/login-watcher/login-watcher.component';
import { LandingComponent } from './containers/landing/landing.component';
import { CeremonyContainer } from './containers/landing/containers/ceremony/ceremony.container';
import { LunchContainer } from './containers/landing/containers/lunch/lunch.container';
import { PartyContainer } from './containers/landing/containers/party/party.container';
import { GmapComponent } from './components/gmap/gmap.component';



const firebaseConfig = {
    projectId: 'wed-nvttn-roccar',
    apiKey: 'AIzaSyAyG8eck94fqAzBZpPpcDnq56rJLEtoSno',
    authDomain: 'wed-nvttn-roccar.firebaseapp.com',
    databaseURL: 'https://wed-nvttn-roccar.firebaseio.com',
    storageBucket: 'wed-nvttn-roccar.appspot.com',
    messagingSenderId: '282300012202'
};


@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        LoginComponent,
        WelcomeComponent,
        LoginWatcherComponent,
        LandingComponent,
        CeremonyContainer,
        LunchContainer,
        PartyContainer,
        GmapComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
