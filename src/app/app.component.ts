import {Component, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  // private user: Observable<firebase.User>;
  private subscriptions: Array<Subscription>;
  public isAuth: boolean;
  title = 'app';

  constructor(
      public afAuth: AngularFireAuth,
      public af: AngularFireDatabase,
      public router: Router
  ) {
      this.subscriptions = [];
      this.isAuth = false;
      this.subscriptions.push(this.afAuth.authState.subscribe(authState => {
          this.isAuth = !!authState;
          if (this.isAuth) {
              window.localStorage.setItem('uid', this.afAuth.auth.currentUser.uid);
          } else {
              this.router.navigate(['']);
          }
      }));
      this.subscriptions.push(
        this.af.object('data').valueChanges().subscribe(appData => {
          console.log('appData', appData, !!appData)
          if (!!appData) {
              window.localStorage.setItem('appData', JSON.stringify(appData));
          }
      }));
  }

  logOut() {
      this.afAuth.auth.signOut();
      window.localStorage.clear();
  }

  ngOnDestroy() {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
