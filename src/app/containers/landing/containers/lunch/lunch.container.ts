import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {dropDown, routerTransition} from '../../../../app.animations';
import {User} from '../../../../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.container.html',
  styleUrls: ['./lunch.container.scss'],
  animations: [routerTransition, dropDown]
})
export class LunchContainer implements OnInit, OnDestroy {
  @HostBinding('@routerTransition') public isLoaded = {value: '*', params: {duration: 800}};
  private subscription: Subscription;
  public userData: User;
  public lunchAddress = {
    lat: 40.4277714,
    lng: -3.6902783
  };
  public ceremonyAddress = {
    lat: 40.393830,
    lng: -3.698495
  };
  public ceremonySuggestion = {
    label: 'la ceremonia',
    coords: this.ceremonyAddress
  };
  public isMenuOpen: Boolean = false;

  constructor(private db: AngularFireDatabase) {
    this.subscription = this.db
        .object('guests/' + localStorage.getItem('uid'))
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

  toggleDropdown() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
