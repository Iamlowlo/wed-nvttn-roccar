import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  public userData: User;
  public isAuth: Boolean;
  private subscriptions: Array<Subscription>;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    this.isAuth = false;
    this.subscriptions = [];
    this.subscriptions.push(
      this.db
        .object('guests/' + localStorage.getItem('uid'))
        .valueChanges()
        .subscribe((userData: User) => {
          this.userData = userData;
        }),
      this.afAuth.authState.subscribe(authState => {
        this.isAuth = !!authState;
      })
    );
  }

  ngOnInit() {
  }

  logOut() {
    this.afAuth.auth.signOut();
    window.localStorage.clear();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
