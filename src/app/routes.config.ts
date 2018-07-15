import {Routes} from '@angular/router';
import {LoginComponent} from './containers/login/login.component';
import {AdminComponent} from './containers/admin/admin.component';
import {WelcomeComponent} from './containers/welcome/welcome.component';
import {LandingComponent} from './containers/landing/landing.component';
import {CeremonyContainer} from './containers/landing/containers/ceremony/ceremony.container';
import {LunchContainer} from './containers/landing/containers/lunch/lunch.container';
import {PartyContainer} from './containers/landing/containers/party/party.container';
import {RSVPContactComponent} from './containers/landing/containers/rsvp-contact/rsvp-contact.component';
import {IsAuthGuardService} from './services/is-auth-guard.service';
import {IsInvitedGuardService} from './services/is-invited-guard.service';
import {IsAdminGuardService} from './services/is-admin-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'admin',
        component: AdminComponent,
        canActivate: [IsAdminGuardService]
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'landing',
        component: LandingComponent,
        canActivate: [IsAuthGuardService],
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
            component: LunchContainer,
            canActivate: [IsInvitedGuardService]
          },
          {
            path: 'fiesta',
            component: PartyContainer,
            canActivate: [IsInvitedGuardService]
          },
          {
            path: 'rsvp-contacto',
            component: RSVPContactComponent
          },
          {
            path: '**',
            redirectTo: 'ceremonia'
          }
        ]
    }
];
