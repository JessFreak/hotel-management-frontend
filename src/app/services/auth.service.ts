import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginPayload, RegisterPayload } from '../models/auth.payload';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor (private http: HttpClient) {}

  register (registerForm: RegisterPayload): Observable<{}> {
    return this.http.post(`${this.baseUrl}/register`, registerForm);
  }

  login (loginForm: LoginPayload): Observable<{}> {
    return this.http.post(`${this.baseUrl}/login`, loginForm);
  }

  getMe(): void {
    this.http.get<User>(`${this.baseUrl}/me`)
      .subscribe(user => {
        this.userSubject.next(user);
      });
  }

  logout(): void {
    this.http.post(`${this.baseUrl}/logout`, {})
      .subscribe(() => {
        this.userSubject.next(null);
      });
  }
}
