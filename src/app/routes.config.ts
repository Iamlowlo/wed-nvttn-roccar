import { LoginComponent } from './containers/login/login.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { Routes } from '@angular/router/src/config';

export const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  }
];
