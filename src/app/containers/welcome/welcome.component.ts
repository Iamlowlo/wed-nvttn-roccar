import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private items: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('guests').valueChanges();
  }

  ngOnInit() {
  }

}
