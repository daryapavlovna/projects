import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/internal/operators';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'home-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(private usersService: UsersService,
              private router: Router,
              private fb: FormBuilder,
              private title: Title) {
        title.setTitle('Регистрация');
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      agree: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    // if (this.form.valid) {
      const { email, password, name } = this.form.value;
      const user =  new User(email, password, name);
      this.usersService.createNewUser(user).subscribe(() => this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      }));
    // }
  }

  forbiddenEmails(control: FormControl): Observable<any> {
    if (control.touched || control.dirty) {
      return control.valueChanges
        .pipe(
          debounceTime(500),
          switchMap(value => this.usersService.getUserByEmail(value)),
          map((user) => {
            console.log(user);
            if (user) {
              return {forbiddenEmail: true};
            } else {
              return null;
            }
          })
        );
    }
  }

}
