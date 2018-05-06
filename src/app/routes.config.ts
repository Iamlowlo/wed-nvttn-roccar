import {Routes} from '@angular/router';
import {LoginComponent} from './containers/login/login.component';
import {AdminComponent} from './containers/admin/admin.component';
import {WelcomeComponent} from './containers/welcome/welcome.component';
import {LandingComponent} from './containers/landing/landing.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'landing',
        component: LandingComponent
    }
];
