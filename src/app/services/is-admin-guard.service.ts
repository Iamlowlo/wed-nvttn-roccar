import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IsAdminGuardService implements  CanActivate {

  constructor(private db: AngularFireDatabase, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.db.object('/guests/' + window.localStorage.getItem('uid'))
      .valueChanges().map( (data: User) => {
        if (data.admin) {
          return true;
        } else {
          this.router.navigate(['/landing/ceremonia']);
          return false;
        }
      });
  }

}