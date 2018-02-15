import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}
}
