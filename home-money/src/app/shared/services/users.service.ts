import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { map } from 'rxjs/internal/operators';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users?email=${email}`);
  }

  createNewUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users', user);
  }
}
