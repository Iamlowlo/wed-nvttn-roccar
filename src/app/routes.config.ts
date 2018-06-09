import {Routes} from '@angular/router';
import {LoginComponent} from './containers/login/login.component';
import {AdminComponent} from './containers/admin/admin.component';
import {WelcomeComponent} from './containers/welcome/welcome.component';
import {LandingComponent} from './containers/landing/landing.component';
import {CeremonyContainer} from './containers/landing/containers/ceremony/ceremony.container';
import {LunchContainer} from './containers/landing/containers/lunch/lunch.container';
import {PartyContainer} from './containers/landing/containers/party/party.container';

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
        component: LandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'ceremonia'
          },
          {
            path: 'ceremonia',
            component: CeremonyContainer
          },
          {
            path: 'comida',
            component: LunchContainer
          },
          {
            path: 'fiesta',
            component: PartyContainer
          }
        ]
    }
];
