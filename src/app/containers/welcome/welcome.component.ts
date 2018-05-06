import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../models/user.model';
import {fadeIn, fadeOut, fadeOutShrinking, textCrawl} from '../../app.animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [fadeIn, fadeOut, fadeOutShrinking, textCrawl]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public appData;
  public showSkip: boolean;
  public introStep: number;
  private subscriptions: Array<Subscription>;

  constructor(private db: AngularFireDatabase, private router: Router) {
    this.subscriptions = [];
    this.showSkip = false;
    this.introStep = 0;
    this.appData = JSON.parse(window.localStorage.getItem('appData'));
  }

  ngOnInit() {
    setTimeout(() => {
      this.introStep = 1;
    }, 1000);
    setTimeout(() => {
      this.showSkip = true;
    }, 2000);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  animationStepper(event, toState, stepTriggered, delay) {
    if (event.toState === toState) {
      console.log('event', event);
      setTimeout(() => {
        this.introStep += 1;
      }, delay || 2000);
    }
  }

  animationEnded() {
    this.router.navigate(['landing']);
  }

}
