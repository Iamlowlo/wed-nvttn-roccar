import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './containers/login/login.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { appRoutes } from './routes.config';

@NgModule({
  declarations: [AppComponent, LoginComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
