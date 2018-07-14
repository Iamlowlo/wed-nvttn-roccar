import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  public userData: User;
  public isAuth: Boolean;
  public isOpen: Boolean;
  private rsvpChoice: string;
  private subscriptions: Array<Subscription>;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    this.isAuth = false;
    this.isOpen = false;
    this.subscriptions = [
      this.router.events.subscribe(routerEvent => {
        if (routerEvent instanceof NavigationEnd) {
          this.isOpen = false;
          switch (routerEvent.urlAfterRedirects) {
            case '/landing/ceremonia':
              this.rsvpChoice = 'ceremony';
              break;
            case '/landing/comida':
              this.rsvpChoice = 'lunch';
              break;
            case '/landing/fiesta':
              this.rsvpChoice = 'party';
              break;
            default:
              this.rsvpChoice = '';
          }
        }
      }),
      this.db
        .object('guests/' + localStorage.getItem('uid'))
        .valueChanges()
        .subscribe((userData: User) => {
          this.userData = userData;
        }),
      this.afAuth.authState.subscribe(authState => {
        this.isAuth = !!authState;
      })
    ];
  }

  ngOnInit() {
  }

  toggleRsvp(forcedValue?: boolean) {
    this.isOpen = forcedValue !== undefined
        ? forcedValue
        : !this.isOpen;
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
