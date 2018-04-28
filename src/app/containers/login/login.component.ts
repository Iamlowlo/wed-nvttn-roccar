import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {showUp} from '../../app.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [showUp]
})
export class LoginComponent implements OnInit, OnDestroy {
  private user: Observable<firebase.User>;
  private items: AngularFireList<any[]>;
  private msgVal = '';
  public isLoginWatcherReady = false;
  public isShowingWatcher = true;
  private subscriptions: Array<Subscription>;
  public loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
  });

  constructor(
      public afAuth: AngularFireAuth,
      public af: AngularFireDatabase,
      public router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.isShowingWatcher = true;
    }, 2000);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.signIn(this.loginForm.value);
    }
  }
  signIn(form) {
      this.afAuth.auth.signInWithEmailAndPassword(form.user, form.pass)
          .then(resp => {
            this.router.navigate(['welcome']);
          })
          .catch(err => {
            console.log('err', err);
          });
  }
  onLoginWatcherDone($event) {
    this.isLoginWatcherReady = true;
  }
  ngOnDestroy() {}

}
