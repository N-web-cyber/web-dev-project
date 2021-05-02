import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthToken } from '../models/auth.token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = 'http://localhost:8000/api';
  constructor(
    private http: HttpClient,
   ) { }

  login(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.BASE_URL}/login/`, {
      username,
      password,
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/profile/`);
  }
}
