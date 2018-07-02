import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  answers = [
    { type: 'yes', text: 'yes'},
    { type: 'no', text: 'no'}
  ];
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(14)])
      }),
      country: new FormControl('uk'),
      answer: new FormControl('no')
    });
  }

  onSubmit(): void {
    console.log('Submitted!', this.form);
    console.log(this.form.get('user.pass').errors);
  }
}
