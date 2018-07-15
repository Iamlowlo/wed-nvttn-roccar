import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IsInvitedGuardService implements  CanActivate {

    constructor(private db: AngularFireDatabase, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.db.object('/guests/' + window.localStorage.getItem('uid'))
          .valueChanges().map( (data: User) => {
            let isInvited = false;
            switch (state.url) {
              case '/landing/ceremonia':
                isInvited = true;
                break;
              case '/landing/comida':
                isInvited = !!data.lunch;
                break;
              case '/landing/fiesta':
                isInvited = !!data.party;
                break;
            }
            if (isInvited) {
              return true;
            } else {
              this.router.navigate(['/landing/ceremonia']);
              return false;
            }
          });
    }

}
