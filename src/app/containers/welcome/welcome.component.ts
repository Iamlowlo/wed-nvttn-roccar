import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public user: User;
  private subscriptions: Array<Subscription>;

  constructor(db: AngularFireDatabase) {
    this.subscriptions = [];
    this.user = {} as User;
    const uid = window.localStorage.getItem('uid');
    this.subscriptions.push(db.object('guests/' + uid ).valueChanges().subscribe((user: User) => {
      this.user = user;
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
