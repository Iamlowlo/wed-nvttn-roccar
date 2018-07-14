import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class IsAuthGuardService implements  CanActivate {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.firebaseAuth.authState.map(auth => {
      if (auth ===  null || auth === undefined) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }

}
