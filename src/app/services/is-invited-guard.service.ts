import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class IsInvitedGuardService implements  CanActivate {

    constructor(private db: AngularFireDatabase, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log(this.db.object('/guests/' + window.localStorage.getItem('uid')));
        return true;
       /* return this.db.database.map(auth => {
            console.log('auth', auth);
            if (auth ===  null || auth === undefined) {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        });
        */
    }

}
