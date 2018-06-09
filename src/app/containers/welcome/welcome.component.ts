import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {fadeIn, fadeOut, logoStarWars, textCrawl} from '../../app.animations';
import {Router} from '@angular/router';
import * as Starfield from 'canvas-starfield';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [fadeIn, fadeOut, logoStarWars, textCrawl]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public appData;
  public showSkip: boolean;
  public introStep: number;
  private subscriptions: Array<Subscription>;
  public starField: Starfield;

  constructor(private router: Router, private element: ElementRef) {
    this.subscriptions = [];
    this.showSkip = false;
    this.introStep = 1;
    this.appData = JSON.parse(window.localStorage.getItem('appData'));
  }

  ngOnInit() {
    // this.starField = new Starfield({
    //   canvas: 'app-welcome',
    //   numStars: 800,
    //   dx: 0,
    //   dy: 0,
    //   maxRadius: 2
    // });

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
      setTimeout(() => {
        this.introStep += 1;
      }, typeof delay === 'number' ? delay : 2000);
    }
  }

  animationEnded() {
    this.router.navigate(['landing']);
  }

}
