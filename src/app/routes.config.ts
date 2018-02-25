import {LoginComponent} from './containers/login/login.component';
import {AdminComponent} from './containers/admin/admin.component';
import {Routes} from '@angular/router';

export const AppRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'admin',
        component: AdminComponent
    }
];
