import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../models/user.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-rsvp-contact',
  templateUrl: './rsvp-contact.component.html',
  styleUrls: ['./rsvp-contact.component.scss']
})
export class RSVPContactComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
