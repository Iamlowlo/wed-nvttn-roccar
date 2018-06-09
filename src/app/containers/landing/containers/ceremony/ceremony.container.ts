import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-ceremony',
  templateUrl: './ceremony.container.html',
  styleUrls: ['./ceremony.container.scss']
})
export class CeremonyContainer implements OnInit, OnDestroy {
  private subscription: Subscription;
  private userData: User;
  constructor(private db: AngularFireDatabase) {
    this.db.object('guests/' + window.localStorage.getItem('uid'))
      .valueChanges()
      .subscribe((userData: User) => {
        this.userData = userData;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
