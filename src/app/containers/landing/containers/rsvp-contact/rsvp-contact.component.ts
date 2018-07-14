import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../models/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {routerTransition} from '../../../../app.animations';

@Component({
  selector: 'app-rsvp-contact',
  templateUrl: './rsvp-contact.component.html',
  styleUrls: ['./rsvp-contact.component.scss'],
  animations: [routerTransition]
})
export class RSVPContactComponent implements OnInit {
  @HostBinding('@routerTransition') public isLoaded = {value: '*', params: {duration: 800}};

  constructor() {
  }

  ngOnInit() {
  }

}
