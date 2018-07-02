import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  answers = [
    { type: 'yes', text: 'yes'},
    { type: 'no', text: 'no'}
  ];
  defaultAnswer = 'no';
  defaultCountry = 'uk';
  formData = {};
  isSubmited = false;

  constructor() {}

  ngOnInit(): void {}

  submitForm(): void {
    this.isSubmited = true;
    this.formData = this.form.value;
    this.form.reset();
  }

  addRandEmail(): void {
    const randEmail = 'darya@mail.ru';
    this.form.form.patchValue({
      user: {
        email: randEmail
      }
    });
  }
}
