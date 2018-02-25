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
  private items: AngularFireList<any[]>;
  private subscriptions: Array<Subscription>;
  title = 'app';

  constructor(
      public afAuth: AngularFireAuth,
      public af: AngularFireDatabase,
      public router: Router
  ) {
      this.subscriptions = [];
      this.subscriptions.push(this.afAuth.authState.subscribe(authState => {
          if (!authState) {
              this.router.navigate(['']);
          }
      }));
  }

  logOut() {
      this.afAuth.auth.signOut();
  }

  ngOnDestroy() {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
