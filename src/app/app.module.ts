import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { AdminComponent } from './containers/admin/admin.component';
import { LoginComponent } from './containers/login/login.component';
import {AppRoutes} from './routes.config';



const firebaseConfig = {
    projectId: 'wed-nvttn-roccar',
    apiKey: 'AIzaSyAyG8eck94fqAzBZpPpcDnq56rJLEtoSno',
    authDomain: 'wed-nvttn-roccar.firebaseapp.com',
    databaseURL: 'https://wed-nvttn-roccar.firebaseio.com',
    storageBucket: 'wed-nvttn-roccar.appspot.com',
    messagingSenderId: '282300012202'
}


@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }